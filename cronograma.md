### 26/05
* **Telas afetadas:** `AdminLayout.jsx`, `ManageVagas.jsx`, `ManageNoticias.jsx`.
* Configuração do projeto React (rotas, layouts globais) e do cliente HTTP. Codificação do layout administrativo funcional e das telas de listagem de Vagas e Notícias, realizando requisições `GET` na `API_FUNDACAO` para renderizar as tabelas com dados do banco.

---

### 29/05
* **Telas afetadas:** Componentes de Formulário (Vagas/Notícias), Componentes de Modal de exclusão, atualização em `ManageVagas.jsx` e `ManageNoticias.jsx`.
* Formulários de criação e edição para Vagas e Notícias 100% integrados. Modais customizados de exclusão (`DELETE`) implementados. Inserção do tratamento de respostas da API (mensagens de sucesso/erro direto na UI).

---

### 02/06
* **Telas afetadas:** `ManageEventos.jsx`, `ManageExames.jsx`, Telas de Listagem (adição de componentes de busca/filtro), `Home` (Landing Page Pública).
* CRUDs completos de **Eventos** e **Exames** integrados à API. Lógica de Busca e Filtros dinâmicos nas tabelas do Admin (fazendo requisições com query params). Início do Frontend da **Área Pública** (Landing Page realizando o primeiro fetch em tempo real).

---

### 09/06
* **Telas afetadas:** `Dashboard.jsx`, Telas da Área Pública (Detalhes de Vaga, Detalhes de Notícia).
* Área Pública 100% navegável e renderizando detalhes individuais das vagas e notícias puxadas do backend. **Dashboard Central** do Admin codificado para consumir os endpoints reais de estatísticas globais.

---

### 25/06 - **ENTREGA FINAL FUNDAÇÃO**