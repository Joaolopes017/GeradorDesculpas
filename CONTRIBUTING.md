# 🤝 Guia de Contribuição

Obrigado por considerar contribuir com o Gerador de Desculpas Plausíveis! Este documento contém diretrizes para contribuir com o projeto.

---

## 📋 Como Posso Contribuir?

### 🐛 Reportar Bugs

Se você encontrou um bug:

1. Verifique se o bug já não foi reportado nas [issues](https://github.com/seu-usuario/gerador-desculpas/issues)
2. Se não foi, crie uma nova issue incluindo:
   - Título descritivo
   - Passos para reproduzir o bug
   - Comportamento esperado vs. comportamento atual
   - Screenshots (se aplicável)
   - Ambiente (OS, versão do Python/Node, navegador)

**Template de Bug:**
```markdown
**Descrição do Bug**
Uma descrição clara do bug.

**Como Reproduzir**
1. Vá para '...'
2. Clique em '...'
3. Veja o erro

**Comportamento Esperado**
O que deveria acontecer.

**Screenshots**
Se aplicável, adicione screenshots.

**Ambiente:**
 - OS: [ex: Windows 11]
 - Navegador: [ex: Chrome 120]
 - Versão do Python: [ex: 3.11]
```

### 💡 Sugerir Melhorias

Para sugerir novas funcionalidades:

1. Verifique se a funcionalidade já não foi sugerida
2. Crie uma issue com o label `enhancement`
3. Descreva detalhadamente:
   - Qual problema a funcionalidade resolve
   - Como ela funcionaria
   - Exemplos de uso

### 📝 Melhorar Documentação

A documentação sempre pode melhorar! Contribuições incluem:

- Corrigir erros de digitação ou gramática
- Adicionar exemplos práticos
- Traduzir documentação
- Criar tutoriais em vídeo
- Melhorar diagramas

### 💻 Contribuir com Código

#### Setup do Ambiente de Desenvolvimento

1. **Fork o repositório**

2. **Clone seu fork**
   ```bash
   git clone https://github.com/seu-usuario/gerador-desculpas.git
   cd gerador-desculpas
   ```

3. **Crie uma branch**
   ```bash
   git checkout -b feature/minha-feature
   # ou
   git checkout -b fix/meu-bug-fix
   ```

4. **Configure o ambiente**
   ```bash
   # Backend
   cd backend
   python -m venv venv
   source venv/bin/activate  # Linux/Mac
   venv\Scripts\activate     # Windows
   pip install -r requirements.txt
   
   # Frontend
   cd frontend
   npm install
   ```

5. **Faça suas alterações**

6. **Teste suas alterações**
   ```bash
   # Backend
   pytest
   
   # Frontend
   npm run test
   ```

7. **Commit suas mudanças**
   ```bash
   git add .
   git commit -m "feat: adiciona nova funcionalidade X"
   ```

8. **Push para seu fork**
   ```bash
   git push origin feature/minha-feature
   ```

9. **Abra um Pull Request**

---

## 📐 Padrões de Código

### Python (Backend)

- Siga a [PEP 8](https://pep8.org/)
- Use type hints quando possível
- Docstrings para classes e funções públicas
- Máximo de 100 caracteres por linha

**Exemplo:**
```python
def generate_excuse(
    receiver_role: str,
    event_context: str,
    severity_level: int
) -> str:
    """
    Gera uma desculpa plausível.
    
    Args:
        receiver_role: Destinatário da mensagem
        event_context: Contexto do evento
        severity_level: Gravidade de 1-10
        
    Returns:
        String com a desculpa gerada
    """
    # Implementação
    pass
```

### JavaScript/React (Frontend)

- Use ESLint (configuração já incluída)
- Componentes funcionais com Hooks
- Props desconstruídas
- Comentários JSDoc para funções complexas

**Exemplo:**
```jsx
/**
 * Componente de botão de tom
 * @param {Object} props
 * @param {string} props.tone - Tom selecionado
 * @param {Function} props.onClick - Callback ao clicar
 */
export function ToneButton({ tone, onClick }) {
  return (
    <button onClick={() => onClick(tone)}>
      {tone}
    </button>
  );
}
```

### Commits

Siga o padrão [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `docs:` Mudanças na documentação
- `style:` Formatação (não afeta código)
- `refactor:` Refatoração de código
- `test:` Adicionar ou modificar testes
- `chore:` Tarefas de manutenção

**Exemplos:**
```
feat: adiciona integração com Telegram
fix: corrige erro no cálculo de severidade
docs: atualiza guia de instalação
refactor: simplifica lógica do prompt template
```

---

## 🧪 Testes

### Backend

```bash
cd backend
pytest tests/ -v
```

Todos os PRs devem incluir testes para novas funcionalidades.

**Estrutura de teste:**
```python
def test_generate_excuse():
    """Testa geração básica de desculpa"""
    service = ExcuseGeneratorService()
    result = service.generate_excuse(
        receiver_role="Chefe",
        event_context="Reunião",
        severity_level=5,
        tone_style="Profissional"
    )
    assert isinstance(result, str)
    assert len(result) > 0
```

### Frontend

```bash
cd frontend
npm run test
```

---

## 📦 Pull Requests

### Checklist antes de abrir um PR

- [ ] Código segue os padrões do projeto
- [ ] Testes adicionados/atualizados
- [ ] Documentação atualizada
- [ ] Commit messages seguem padrão
- [ ] Build passa sem erros
- [ ] Sem conflitos com branch main

### Template de PR

```markdown
## Descrição
Breve descrição das mudanças.

## Tipo de Mudança
- [ ] Bug fix
- [ ] Nova funcionalidade
- [ ] Breaking change
- [ ] Melhoria de documentação

## Como Testar
1. Execute X
2. Faça Y
3. Verifique Z

## Screenshots (se aplicável)
Adicione screenshots das mudanças visuais.

## Checklist
- [ ] Código testado localmente
- [ ] Testes adicionados
- [ ] Documentação atualizada
- [ ] Lint passou sem erros
```

---

## 🎨 Áreas que Precisam de Ajuda

### Backend
- [ ] Implementar cache com Redis
- [ ] Adicionar rate limiting
- [ ] Melhorar testes unitários
- [ ] Adicionar suporte a mais LLMs (Claude, Llama)

### Frontend
- [ ] Adicionar histórico de desculpas
- [ ] Implementar modo escuro
- [ ] Melhorar acessibilidade (ARIA)
- [ ] Adicionar animações

### Documentação
- [ ] Tradução para inglês
- [ ] Tutoriais em vídeo
- [ ] Diagramas de arquitetura
- [ ] Guias de uso avançado

### DevOps
- [ ] GitHub Actions CI/CD
- [ ] Testes automatizados E2E
- [ ] Monitoring com Grafana
- [ ] Docker otimização

---

## 🏆 Reconhecimento

Todos os contribuidores serão listados no README principal!

---

## ❓ Dúvidas?

- Consulte a [documentação completa](README.md)
- Abra uma [issue de discussão](https://github.com/seu-usuario/gerador-desculpas/issues/new)
- Entre em contato por email (se disponível)

---

## 📜 Código de Conduta

### Nosso Compromisso

Nos comprometemos a tornar a participação neste projeto uma experiência livre de assédio para todos, independentemente de:
- Idade
- Tamanho corporal
- Deficiência
- Etnia
- Identidade de gênero
- Nível de experiência
- Nacionalidade
- Aparência pessoal
- Raça
- Religião
- Identidade ou orientação sexual

### Comportamento Esperado

- Usar linguagem acolhedora e inclusiva
- Respeitar pontos de vista diferentes
- Aceitar críticas construtivas
- Focar no que é melhor para a comunidade
- Demonstrar empatia

### Comportamento Inaceitável

- Linguagem ou imagens sexualizadas
- Comentários insultuosos ou depreciativos
- Assédio público ou privado
- Publicar informações privadas de outros
- Conduta não profissional

---

**Obrigado por contribuir! 🎉**

Sua ajuda torna este projeto melhor para todos.
