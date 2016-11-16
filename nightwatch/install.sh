if [ ! -e "chromedriver" ]; then
  echo 'Downloading chrome driver'
  curl http://chromedriver.storage.googleapis.com/2.25/chromedriver_linux64.zip > chromedriver.zip
  unzip ./chromedriver.zip
  rm -f chromedriver.zip
fi
