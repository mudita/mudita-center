echo '\033[0;32m \n### SHARED ###'
echo "\n## 0. Remove old /shared-dist"
rm -rv shared/dist
echo "---> Done"

echo "\n## 1. Building"
npm run build:shared
echo "---> Done"

echo "\n## 2. Move a proper tsconfig"
cp shared/tsconfig.dist.json shared/dist/tsconfig.json
echo "---> Done"
echo "\033[0m"
