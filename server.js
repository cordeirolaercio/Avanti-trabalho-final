const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const app = express();
const prisma = new PrismaClient();

// Middlewares
app.use(cors()); // Permite requisições de outras origens (como o React)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Inicia com todos os alunos cadastrados
app.get('/alunos', async (req, res) => {
  try {
    const alunos = await prisma.aluno.findMany();
    res.json(alunos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar alunos' });
  }
});

// GET alunos/:id - Retorna um aluno pelo ID
app.get('/alunos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const aluno = await prisma.aluno.findUnique({
      where: { id: parseInt(id) }
    });
    if (!aluno) {
      res.status(404).json({ error: 'Aluno não encontrado' });
    } else {
      res.json(aluno);
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar aluno' });
  }
});

// POST alunos - Cria um novo aluno
app.post('/alunos/novo', async (req, res) => {
  const { nome, turma, email, nascimento } = req.body;
  try {
    const novoAluno = await prisma.aluno.create({
      data: {
        nome,
        turma,
        email,
        nascimento,
      }
    });
    // Criando o boletim automaticamente para o aluno cadastrado
 const boletim = await prisma.boletim.create({
    data: {
      alunoId: novoAluno.id, 
      matematica: 0,
      portugues: 0,
      historia: 0,
      ciencias: 0,
      ingles: 0,
      media: 0, 
    },
  });

    res.status(201).json({ aluno: novoAluno, boletim });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar aluno e boletim' });
  }
});
 
// PUT alunos/:id - Atualiza um aluno existente
app.put('/alunos/atualizar', async (req, res) => {
  const { id } = req.params;
  const { nome, turma, email, nascimento } = req.body;
  try {
    const alunoAtualizado = await prisma.aluno.update({
      where: { id: parseInt(id) },
      data: { nome, turma, email, nascimento }
    });
    res.json(alunoAtualizado);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar aluno' });
  }
});
// Atualizar boletim
app.put("/boletins/:id", async (req, res) => {
    const { id } = req.params;
    const { matematica, portugues, historia, ciencias, ingles } = req.body;
  
    if (
      isNaN(matematica) ||
      isNaN(portugues) ||
      isNaN(historia) ||
      isNaN(ciencias) ||
      isNaN(ingles)
    ) {
      return res.status(400).json({ error: "Todas as notas devem ser numéricas" });
    }
  
    try {
      // Calcula a média das notas
      const media =
        (parseFloat(matematica) +
          parseFloat(portugues) +
          parseFloat(historia) +
          parseFloat(ciencias) +
          parseFloat(ingles)) /
        5;
  
      // Atualiza o boletim com as novas notas e a média
      const boletimAtualizado = await prisma.boletim.update({
        where: { id: Number(id) },
        data: { matematica, portugues, historia, ciencias, ingles, media },
      });
  
      res.json(boletimAtualizado);
    } catch (error) {
      res.status(500).json({ error: "Erro ao atualizar boletim" });
    }
  });

// DELETE alunos/:id - Remove um aluno
app.delete('/alunos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.aluno.delete({
      where: { id: parseInt(id) }
    });
    res.json({ message: 'Aluno removido com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao remover aluno' });
  }
});
// Professores cadastrados
app.get('/professores', async (req, res) => {
    try {
      const professores = await prisma.professor.findMany();
      res.json(professores);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar professor' });
    }
  });
// GET professores/:id - Retorna um professor pelo ID
app.get('/professores/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const professor = await prisma.professor.findUnique({
        where: { id: parseInt(id) }
      });
      if (!professor) {
        res.status(404).json({ error: 'Professor não encontrado' });
      } else {
        res.json(professor);
      }
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar professor' });
    }
  });
  // PUT professores/:id - Atualiza um professor existente
app.put('/professores/atualizar', async (req, res) => {
    const { id } = req.params;
    const { nome, disciplina, email } = req.body;
    try {
      const professorAtualizado = await prisma.professor.update({
        where: { id: parseInt(id) },
        data: { nome, disciplina, email}
      });
      res.json(professorAtualizado);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar professor' });
    }
  });
  // DELETE professores/:id - Remove um professor
app.delete('/professores/remover', async (req, res) => {
    const { id } = req.params;
    try {
      await prisma.professor.delete({
        where: { id: parseInt(id) }
      });
      res.json({ message: 'Professor removido com sucesso' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao remover professor' });
    }
  });


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
