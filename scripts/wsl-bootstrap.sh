set -e

sudo apt-get update -y
sudo apt-get upgrade -y
sudo apt-get dist-upgrade -y
sudo apt-get install build-essential -y
sudo apt-get install -y curl nodejs npm yarn

curl https://sh.rustup.rs -sSf
# sh -c "$(curl -sSfL https://release.solana.com/stable/install)"