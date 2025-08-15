# Release Notes - Versão 1.5.1

## 🎉 Nova Versão Disponível

A versão 1.5.1 do n8n Community Node para Guru Digital Manager API está agora disponível!

## 🔧 Correções Implementadas

### ✅ Problema de Credenciais Resolvido

**Problema**: O erro "Node does not have any credentials set" estava impedindo o uso do node.

**Solução**: 
- Adicionada seção `credentials` no `package.json`
- Corrigido arquivo principal para apontar para `dist/index.js`
- Credenciais agora são reconhecidas corretamente pelo n8n

### 📝 Mudanças Técnicas

1. **package.json**:
   ```json
   "n8n": {
     "credentials": [
       "dist/credentials/GuruDigitalManagerApi.credentials.js"
     ]
   }
   ```

2. **Arquivo principal**: Alterado de `index.js` para `dist/index.js`

3. **Documentação**: Adicionado `CREDENTIALS_SETUP.md` com instruções detalhadas

## 🚀 Como Atualizar

### No n8n:

1. **Desinstale** a versão atual do pacote
2. **Instale** a nova versão 1.5.1
3. **Crie uma nova credencial** do tipo "Guru Digital Manager API"
4. **Configure** sua API Key e Base URL
5. **Teste** o node com a credencial configurada

### Comandos Git:

```bash
# Atualizar para a versão mais recente
git pull origin main

# Verificar a tag da versão
git tag -l
```

## 📋 Checklist de Teste

- [ ] Instalação da nova versão
- [ ] Criação de credencial
- [ ] Configuração de API Key
- [ ] Teste de operação "Get All" em contatos
- [ ] Verificação de autenticação
- [ ] Teste de outras operações

## 🔗 Links Úteis

- [Documentação de Configuração](CREDENTIALS_SETUP.md)
- [README Atualizado](README.md)
- [Repositório GitHub](https://github.com/matheuskuboadapta/guru-digital-manager-community-node)

## 📞 Suporte

Se você encontrar algum problema:
1. Verifique a [documentação de configuração](CREDENTIALS_SETUP.md)
2. Abra uma [issue no GitHub](https://github.com/matheuskuboadapta/guru-digital-manager-community-node/issues)
3. Entre em contato: matheus@adaptaconsultoria.com.br

---

**Versão**: 1.5.1  
**Data**: $(date)  
**Status**: ✅ Liberada
