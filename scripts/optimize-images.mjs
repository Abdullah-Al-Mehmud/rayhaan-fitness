import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const inputDir = './public/images/raw';
const outputDir = './public/images/gallery';

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Semantic name mappings for the gallery items
const SEMANTIC_MAPPINGS = {
  '480339472_1161304338722210_8147944471869692269_n': 'mirpur-view',
  '476835828_122221321376063272_1938682987613220531_n': 'dhanmondi-leg-press',
  '571239942_122266774814063272_405562493166168919_n': 'female-training-zone',
  '476316956_122221321418063272_2516349951735035119_n': 'lalbagh-weights',
  '476805824_122221321640063272_7848060289744708750_n': 'mirpur-cardio',
  '496002591_122130322262798841_5417849086654403282_n': 'female-coaching-staff',
  '549430380_1322224442630198_8536890267202826170_n': 'dhanmondi-cable-tower',
  '501034616_1236003694585607_6710246383573128597_n': 'lalbagh-champions',
  '585297287_1375135737339068_8060815428679481532_n': 'lalbagh-community',
  '475661505_1149107629941881_2439705060353978353_n': 'mirpur-community',
  '476639008_1157431452442832_1085578570057076873_n': 'lalbagh-physique',
  '475714999_1149581579894486_800708765137932987_n': 'coach-rayhan-posing',
  '475595996_1147348873451090_116949286086597608_n': 'female-welcome-culture',
  '475299125_1147349020117742_1479273138778702207_n': 'dhanmondi-member-welcome',
  '502661999_1236385927880717_5510179812010385279_n': 'national-stage-judging',
  '589719015_1379659576886684_5825217699640388931_n': 'dhanmondi-pro-mentorship',
  '474947945_122218225838063272_1048553888855028774_n': 'transformation-client-1',
  '477363708_1156774602508517_6366011813251370078_n': 'transformation-client-2',
  'img1': 'team-rayhan-fitness',
  '480916327_122225566244063272_3386797352654488101_n': 'best-gym-bangladesh',
  '474845017_1144413500411294_5260572057868836461_n': 'coach-rayhan-medals',
  '475192082_1146668883519089_4202553493780528864_n': 'coach-rayhan-training',
};

async function optimizeImages() {
  const files = fs.readdirSync(inputDir).filter((file) => /\.(jpe?g|png)$/i.test(file));
  console.log(`Found ${files.length} images to optimize...`);

  const metadataResults = {};

  for (const file of files) {
    const baseName = path.parse(file).name;
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, `${baseName}.webp`);

    // Process to webp with max width 1200 and quality 80
    await sharp(inputPath)
      .resize({ width: 1200, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(outputPath);

    const meta = await sharp(outputPath).metadata();
    metadataResults[baseName] = { width: meta.width, height: meta.height };
    console.log(`Optimized: ${file} -> ${baseName}.webp (${meta.width}x${meta.height})`);

    // If there is a semantic mapping, also save with semantic name
    if (SEMANTIC_MAPPINGS[baseName]) {
      const semanticName = SEMANTIC_MAPPINGS[baseName];
      const semanticOutputPath = path.join(outputDir, `${semanticName}.webp`);
      await sharp(inputPath)
        .resize({ width: 1200, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(semanticOutputPath);
      metadataResults[semanticName] = { width: meta.width, height: meta.height };
      console.log(`  -> also created semantic alias: ${semanticName}.webp`);
    }
  }

  // Write image metadata for CLS-free rendering
  fs.writeFileSync(
    path.join(outputDir, 'metadata.json'),
    JSON.stringify(metadataResults, null, 2),
    'utf-8'
  );
  console.log('Optimization complete! Metadata written to public/images/gallery/metadata.json');
}

optimizeImages().catch((err) => {
  console.error('Error optimizing images:', err);
  process.exit(1);
});
