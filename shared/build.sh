echo '\033[0;32m \n### SHARED ###'
echo "\n## 0. Remove old /shared/dist"
rm -rv shared/dist
echo "---> Done"

echo "\n## 1. Building and re-writing paths"
npm run build:shared
echo "---> Done"

echo "\n## 2. Copying assets"
cp -rv src/renderer/images  shared/dist/src/renderer
cp -rv src/renderer/svg  shared/dist/src/renderer
echo "---> Done"

echo "\033[0m"
