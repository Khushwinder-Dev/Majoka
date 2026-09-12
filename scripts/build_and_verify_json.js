const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const servicesBaseDir = path.join(publicDir, 'servicesSubServicesContent', 'services');

function getValidFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter(f => !f.endsWith('.txt') && !fs.statSync(path.join(dir, f)).isDirectory());
}

function toWebPath(...parts) {
  return '/' + path.join('servicesSubServicesContent', 'services', ...parts).replace(/\\/g, '/');
}

function processServices(data) {
  const diskServices = fs.readdirSync(servicesBaseDir).filter(f => fs.statSync(path.join(servicesBaseDir, f)).isDirectory());

  data.forEach((s) => {
    let sFolder = diskServices.find(f => f === s.serviceSlug || f === s.serviceId);
    if (!sFolder) {
      sFolder = diskServices.find(f => f.includes(s.serviceId) || s.serviceSlug.includes(f));
    }
    if (!sFolder) {
      throw new Error(`Could not find folder for service ${s.serviceId}`);
    }

    const sPath = path.join(servicesBaseDir, sFolder);
    const sBanners = getValidFiles(path.join(sPath, 'banner'));
    const sThumbs = getValidFiles(path.join(sPath, 'thumbnail'));
    const sGallery = getValidFiles(path.join(sPath, 'gallery'));

    // 1. Service Gallery
    if (sGallery.length > 0) {
      s.servicesgalaryImages = sGallery.map(f => toWebPath(sFolder, 'gallery', f));
    }

    // 2. Service Banner
    if (sBanners.length > 0) {
      s.serviceBanner = toWebPath(sFolder, 'banner', sBanners[0]);
    } else if (sGallery.length > 0) {
      const wide = sGallery.find(f => f.includes('1024') || f.includes('870') || f.includes('768') || f.includes('scaled') || f.includes('16-9') || f.includes('banner')) || sGallery[0];
      s.serviceBanner = toWebPath(sFolder, 'gallery', wide);
    }

    // 3. Service Thumbnail (serviceImage)
    if (sThumbs.length > 0) {
      s.serviceImage = toWebPath(sFolder, 'thumbnail', sThumbs[0]);
    } else if (sGallery.length > 0) {
      // Pick a distinctive high-quality image from gallery
      s.serviceImage = s.servicesgalaryImages[0];
    }

    // 4. Subservices
    if (s.subservices) {
      const subsDir = path.join(sPath, 'subservices');
      const diskSubs = fs.existsSync(subsDir) ? fs.readdirSync(subsDir).filter(f => fs.statSync(path.join(subsDir, f)).isDirectory()) : [];

      s.subservices.forEach((sub) => {
        // Fix duplicate slug if present
        if (sub.id === 'maintenance-leak-detection' && sub.serviceSlug === 'pump-tank-installation') {
          sub.serviceSlug = 'maintenance-leak-detection';
        }

        let subFolder = diskSubs.find(f => f === sub.serviceSlug || f === sub.id);
        if (!subFolder) {
          subFolder = diskSubs.find(f => f.replace(/-/g, '') === sub.id.replace(/-/g, '') || f.replace(/-/g, '') === sub.serviceSlug.replace(/-/g, ''));
        }
        if (!subFolder) {
          const noPrefix = sub.id.replace(/^[a-z]+-/, '');
          subFolder = diskSubs.find(f => f === noPrefix || f.includes(noPrefix) || noPrefix.includes(f));
        }
        if (!subFolder) {
          subFolder = diskSubs.find(f => sub.serviceSlug.includes(f) || f.includes(sub.serviceSlug));
        }
        if (!subFolder) {
          throw new Error(`Could not find folder for subservice ${sub.id} in ${sFolder}`);
        }

        const subPath = path.join(subsDir, subFolder);
        const subBanners = getValidFiles(path.join(subPath, 'banner'));
        const subThumbs = getValidFiles(path.join(subPath, 'thumbnail'));
        const subGallery = getValidFiles(path.join(subPath, 'gallery'));

        // Subservice gallery
        if (subGallery.length > 0) {
          sub.servicesgalaryImages = subGallery.map(f => toWebPath(sFolder, 'subservices', subFolder, 'gallery', f));
        } else {
          // Fallback to parent gallery
          sub.servicesgalaryImages = [...s.servicesgalaryImages];
        }

        // Subservice banner
        if (subBanners.length > 0) {
          sub.serviceBanner = toWebPath(sFolder, 'subservices', subFolder, 'banner', subBanners[0]);
        } else {
          sub.serviceBanner = s.serviceBanner;
        }

        // Subservice thumbnail
        if (subThumbs.length > 0) {
          sub.serviceImage = toWebPath(sFolder, 'subservices', subFolder, 'thumbnail', subThumbs[0]);
        } else if (subGallery.length > 0) {
          sub.serviceImage = sub.servicesgalaryImages[0];
        } else {
          sub.serviceImage = s.serviceImage;
        }
      });
    }
  });

  return data;
}

function verifyData(data, label) {
  let checked = 0;
  let missing = [];

  function check(webPath, desc) {
    if (!webPath) return;
    checked++;
    const rel = webPath.startsWith('/') ? webPath.slice(1) : webPath;
    const abs = path.join(publicDir, rel);
    if (!fs.existsSync(abs)) {
      missing.push({ desc, webPath, abs });
    }
  }

  data.forEach(s => {
    check(s.serviceBanner, `Service ${s.serviceNumber} Banner`);
    check(s.serviceImage, `Service ${s.serviceNumber} Image`);
    (s.servicesgalaryImages || []).forEach((img, i) => check(img, `Service ${s.serviceNumber} Gallery [${i}]`));

    (s.subservices || []).forEach(sub => {
      check(sub.serviceBanner, `Sub ${sub.id} Banner`);
      check(sub.serviceImage, `Sub ${sub.id} Image`);
      (sub.servicesgalaryImages || []).forEach((img, i) => check(img, `Sub ${sub.id} Gallery [${i}]`));
    });
  });

  console.log(`[${label}] Checked: ${checked} paths. Missing: ${missing.length}`);
  if (missing.length > 0) {
    console.error('MISSING PATHS:', missing);
    throw new Error(`Verification failed for ${label}`);
  }
}

// 1. Process services_en.json
const enFile = path.join(__dirname, '..', 'data', 'services_en.json');
const enData = JSON.parse(fs.readFileSync(enFile, 'utf8'));
processServices(enData);
verifyData(enData, 'services_en.json');

// Write services_en.json
fs.writeFileSync(enFile, JSON.stringify(enData, null, 2), 'utf8');
console.log('Successfully updated services_en.json!');

// 2. Also update services_ar.json image paths and slug fix
const arFile = path.join(__dirname, '..', 'data', 'services_ar.json');
if (fs.existsSync(arFile)) {
  const arData = JSON.parse(fs.readFileSync(arFile, 'utf8'));
  processServices(arData);
  verifyData(arData, 'services_ar.json');
  fs.writeFileSync(arFile, JSON.stringify(arData, null, 2), 'utf8');
  console.log('Successfully updated services_ar.json!');
}

// 3. Also update data/services.json if present
const sFile = path.join(__dirname, '..', 'data', 'services.json');
if (fs.existsSync(sFile)) {
  const sData = JSON.parse(fs.readFileSync(sFile, 'utf8'));
  processServices(sData);
  verifyData(sData, 'services.json');
  fs.writeFileSync(sFile, JSON.stringify(sData, null, 2), 'utf8');
  console.log('Successfully updated services.json!');
}
