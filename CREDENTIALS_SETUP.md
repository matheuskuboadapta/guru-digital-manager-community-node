# Configuração de Credenciais - Guru Digital Manager API

## Problema Resolvido

O erro "Node does not have any credentials set" estava ocorrendo porque as credenciais não estavam sendo exportadas corretamente no `package.json`.

## Mudanças Realizadas

### 1. Correção do package.json

Adicionamos a seção `credentials` na configuração `n8n`:

```json
"n8n": {
  "n8nNodesApiVersion": 1,
  "nodes": [
    "dist/nodes/GuruDigitalManager/GuruDigitalManager.node.js"
  ],
  "credentials": [
    "dist/credentials/GuruDigitalManagerApi.credentials.js"
  ]
}
```

### 2. Correção do arquivo principal

Alteramos o `main` de `index.js` para `dist/index.js`:

```json
"main": "dist/index.js"
```

## Como Funciona a Autenticação

### 1. Definição da Credencial
- Arquivo: `src/credentials/GuruDigitalManagerApi.credentials.ts`
- Define apenas o campo necessário: `userToken` (Bearer token)
- Base URL é fixa: `https://api.digitalmanager.guru`
- Implementa a interface `ICredentialType`

### 2. Registro no Sistema
- As credenciais são exportadas em `src/index.ts`
- Compiladas para `dist/credentials/GuruDigitalManagerApi.credentials.js`
- Registradas no `package.json` na seção `n8n.credentials`

### 3. Uso no Node
- O node usa automaticamente a credencial `guruDigitalManagerApi`
- As credenciais são obtidas via `this.getCredentials('guruDigitalManagerApi')`
- O token é usado como `Bearer {user_token}` nas requisições HTTP
- Base URL é fixa: `https://api.digitalmanager.guru`

## Como Usar

1. **Instalar o pacote** no n8n
2. **Criar uma nova credencial** do tipo "Guru Digital Manager API"
3. **Configurar**:
   - User Token: Seu token de usuário do Guru (formato: Bearer {user_token})
4. **Usar no node** - a credencial será automaticamente aplicada

## Estrutura de Arquivos

```
src/
├── credentials/
│   └── GuruDigitalManagerApi.credentials.ts  # Definição da credencial
├── nodes/
│   └── GuruDigitalManager/
│       └── GuruDigitalManager.node.ts        # Node que usa a credencial
└── index.ts                                  # Exporta nodes e credenciais

dist/                                         # Arquivos compilados
├── credentials/
│   └── GuruDigitalManagerApi.credentials.js
├── nodes/
│   └── GuruDigitalManager/
│       └── GuruDigitalManager.node.js
└── index.js
```

## Próximos Passos

1. Reinstalar o pacote no n8n
2. Criar uma nova credencial
3. Testar o node com a credencial configurada
