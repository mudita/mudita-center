echo '\033[0;32m \n### SHARED ###'
echo "\n## 0. Remove old /shared/dist"
rm -rv shared/dist
echo "---> Done"

echo "\n## 1. Building and re-writing paths"
npm run build
echo "---> Done"

echo "\n## 2. Copying assets"
cp -rv ../app/src/renderer/images  ./dist/app/src/renderer
cp -rv ../app/src/renderer/svg  ./dist/app/src/renderer
echo "---> Done"

echo "\033[0m"
