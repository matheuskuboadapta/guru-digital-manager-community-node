# Exemplos de Uso - Guru Digital Manager n8n Node

Este documento contém exemplos práticos de como usar o community node do Guru Digital Manager no n8n.

## Configuração Inicial

### 1. Configurar Credenciais

Primeiro, configure as credenciais da API do Guru Digital Manager:

1. Vá para **Settings** > **Credentials**
2. Clique em **Add Credential**
3. Selecione **Guru Digital Manager API**
4. Preencha:
   - **API Key**: Sua chave de API do Guru Digital Manager
   - **Base URL**: https://api.digitalmanager.guru (ou sua URL personalizada)

## Exemplos de Fluxos

### Exemplo 1: Criar um Novo Contato

**Objetivo**: Criar um novo contato quando um lead é capturado em um formulário.

**Configuração do Node**:
- **Resource**: Contact
- **Operation**: Create
- **Contact Data**:
  - **Name**: `{{ $json.name }}`
  - **Email**: `{{ $json.email }}`
  - **Phone**: `{{ $json.phone }}`
  - **Document**: `{{ $json.document }}`

### Exemplo 2: Listar Todos os Contatos

**Objetivo**: Obter uma lista de todos os contatos para análise.

**Configuração do Node**:
- **Resource**: Contact
- **Operation**: Get All
- **Return All**: true (ou false com limite específico)

### Exemplo 3: Atualizar Status de Transação

**Objetivo**: Atualizar o status de uma transação quando o pagamento é confirmado.

**Configuração do Node**:
- **Resource**: Transaction
- **Operation**: Update
- **Transaction ID**: `{{ $json.transactionId }}`
- **Transaction Data**:
  - **Status**: completed
  - **Description**: `{{ $json.description }}`

### Exemplo 4: Criar Assinatura

**Objetivo**: Criar uma nova assinatura quando um cliente assina um plano.

**Configuração do Node**:
- **Resource**: Subscription
- **Operation**: Create
- **Subscription Data**:
  - **Plan**: `{{ $json.plan }}`
  - **Status**: active
  - **Start Date**: `{{ $json.startDate }}`

### Exemplo 5: Fluxo Completo - Lead to Customer

**Objetivo**: Automatizar o processo completo desde a captura do lead até a criação do cliente.

**Fluxo**:
1. **Webhook** - Recebe dados do formulário
2. **Guru Digital Manager** (Create Contact) - Cria o contato
3. **Guru Digital Manager** (Create Transaction) - Registra a transação
4. **Guru Digital Manager** (Create Subscription) - Cria a assinatura
5. **Email** - Envia confirmação

### Exemplo 6: Sincronização de Dados

**Objetivo**: Sincronizar dados entre sistemas diferentes.

**Fluxo**:
1. **Schedule Trigger** - Executa diariamente
2. **Guru Digital Manager** (Get All Contacts) - Obtém contatos
3. **HTTP Request** - Envia dados para outro sistema
4. **Guru Digital Manager** (Update Contact) - Atualiza status de sincronização

## Dicas de Uso

### Tratamento de Erros

Sempre configure o tratamento de erros nos seus fluxos:

1. **Continue on Fail**: Ative esta opção no node para continuar o fluxo mesmo se houver erro
2. **Error Trigger**: Use nodes de erro para capturar e processar falhas
3. **Logging**: Configure logs para monitorar as operações

### Performance

- Use **Get All** com limites apropriados para grandes volumes de dados
- Configure **Rate Limiting** se necessário
- Monitore o tempo de resposta das APIs

### Segurança

- Nunca exponha suas credenciais de API
- Use variáveis de ambiente para configurações sensíveis
- Monitore o uso da API para detectar atividades suspeitas

## Troubleshooting

### Erro de Autenticação
- Verifique se a API Key está correta
- Confirme se a Base URL está correta
- Verifique se a API Key tem as permissões necessárias

### Erro de Validação
- Verifique se todos os campos obrigatórios estão preenchidos
- Confirme se os tipos de dados estão corretos
- Valide o formato dos dados antes de enviar

### Erro de Rede
- Verifique a conectividade com a API
- Confirme se a URL da API está acessível
- Verifique se há problemas de firewall ou proxy
