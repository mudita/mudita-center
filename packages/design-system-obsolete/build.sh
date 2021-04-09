echo '\033[0;32m \n### SHARED ###'
echo "\n## 0. Remove old /dist directory"
rm -rv ./dist
echo "---> Done"

echo "\n## 1. Building and re-writing paths"
npm run build
echo "---> Done"

echo "\n## 2. Copying assets"
cp -rv ../app/src/renderer/images  ./dist/app/src/renderer
cp -rv ../app/src/renderer/svg  ./dist/app/src/renderer
echo "---> Done"

echo "\n## 3. Transforming svg files"
npm run transform:svg
echo "---> Done"

echo "\n## 4. Building svg files"
npm run build:svg
echo "---> Done"

echo "\n## 5. Switch svg files"
rm -rv ./dist/app/src/renderer/svg/*
cp -rv ./dist-svg/* ./dist/app/src/renderer/svg
echo "---> Done"

echo "\n## 6. Cleanup"
rm -rv ./dist-svg
rm -rv ./tmp-svg
echo "---> Done"

echo "\033[0m"
