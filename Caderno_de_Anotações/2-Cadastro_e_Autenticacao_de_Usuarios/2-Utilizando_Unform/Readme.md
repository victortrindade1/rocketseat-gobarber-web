# Utilizando Unform

O Unform é uma lib criada pela RocketSeat q facilita uso de form com React. Vc troca as tags `<form>`, `<input>` por components `<Form>`, `<Input>`, e a lib já trata os dados para acessar por state.

Só ficar atento q as tags q mudarem para components, vc vai precisar inserir o parâmetro `name`.

`yarn add unform`

## src/pages/SignIn/index.js

```diff
import React from 'react';
import { Link } from 'react-router-dom';
+import { Form, Input } from 'unform';

import logo from '~/assets/logo.svg';

function SignIn() {
+ function handleSubmit(data) {
+   console.tron.log(data);
+ }

  return (
    <>
      <img src={logo} alt="GoBarber" />

-     <form>
+     <Form onSubmit={handleSubmit}>
-       <input type="email" placeholder="Seu e-mail" />
+       <Input name="email" type="email" placeholder="Seu e-mail" />
-       <input type="password" placeholder="Sua senha secreta" />
+       <Input
+         name="password"
+         type="password"
+         placeholder="Sua senha secreta"
+       />

        <button type="submit">Acessar</button>
        <Link to="/register">Criar conta gratuita</Link>
-     </form>
+     </Form>
    </>
  );
}

export default SignIn;
```

## src/pages/SignUp/index.js

```diff
import React from 'react';
import { Link } from 'react-router-dom';
+import { Form, Input } from 'unform';

import logo from '~/assets/logo.svg';

function SignUp() {
+ function handleSubmit(data) {
+   console.tron.log(data);
+ }

  return (
    <>
      <img src={logo} alt="GoBarber" />

-     <form>
+     <Form onSubmit={handleSubmit}>
-       <input placeholder="Nome Completo" />
-       <input type="email" placeholder="Seu e-mail" />
-       <input type="password" placeholder="Sua senha secreta" />
+       <Input name="name" placeholder="Nome Completo" />
+       <Input name="email" type="email" placeholder="Seu e-mail" />
+       <Input
+         name="password"
+         type="password"
+         placeholder="Sua senha secreta"
+       />

        <button type="submit">Criar conta</button>
        <Link to="/">Já tenho login</Link>
-     </form>
+     </Form>
    </>
  );
}

export default SignUp;
```
