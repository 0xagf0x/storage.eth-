import contract from '@truffle/contract'

export const loadContract = async (name, provider) => {  // specifiy contract name
    // access JSON file from /public folder 
    const response = await fetch(`/contracts/${name}.json`);
    const Artifact = await response.json(); // gets the file representation
    const _contract = contract(Artifact);
    _contract.setProvider(provider);

    const deployedContract = await _contract.deployed();

  
    return deployedContract
}