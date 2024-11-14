// Importando as dependências

const bip32 = require('bip32');
const bip39 = require('bip39');
const bitcoin = require('bitcoinjs-lib');

//Definir a rede
const network = bitcoin.networks.testnet;

// Derivação de carteiras HD
const path = "m/44'/1'/0/0";

// Gerar a seed
let mnemonic = bip39.generateMnemonic();
const seed = bip39.mnemonicToSeedSync(mnemonic);

// Derivar a carteira raiz
let root = bip32.fromSeed(seed, network);

// Criando uma conta
let account = root.derivePath(path);
let node = account.derive(0).derive(0);

let btcAddress = bitcoin.payments.p2pkh({
    pubkey: account.publicKey,
    network: network,
}).address;


console.log("Carteira criada com sucesso!");
console.log("Carteira: ", btcAddress);
console.log("Chave privada: ", account.toWIF());
console.log("Seed: ", mnemonic);


