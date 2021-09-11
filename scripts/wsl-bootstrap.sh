# NOTE: this file needs work
set -e

sudo apt-get update -y
sudo apt-get upgrade -y
sudo apt-get dist-upgrade -y
sudo apt-get install build-essential -y
sudo apt-get install -y curl nodejs npm

# if permission issues see: https://www.codegrepper.com/code-examples/shell/install+yarn+ubuntu+wsl
npm install -g yarn
npm i @craco/craco

curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
sh -c "$(curl -sSfL https://release.solana.com/stable/install)"

# for solana if the curl fails:
# wget http://release.solana.com/stable/solana-release-x86_64-unknown-linux-gnu.tar.bz2
# tar xjf solana-release-x86_64-unknown-linux-gnu.tar.bz2
# ./solana-release/bin/solana --version