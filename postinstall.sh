if ! [ $? -eq 0 ]; then
  echo "Bootstrapping build-tools..."
  yarn npm run bootstrap
fi
