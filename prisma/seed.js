const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const aluno1 = await prisma.aluno.create({
    data: {
      nome: 'Cristiano Oliveira',
      turma: '6º A',
      email: 'cristiano.oliveira@escola.com',
      nascimento: '2020-12-20T00:00:00.000Z',
    
    },
  });
  
  const aluno2 = await prisma.aluno.create({
    data: {
      nome: 'Laura Farias',
      turma: '6º A',
      email: 'laura.farias@escola.com',
      nascimento: '2021-10-04T00:00:00.000Z',
      
    },
  });

  const professor1 = await prisma.professor.create({
    data: {
        nome:'Alexandre Moraes',
        disciplina: 'Matemática',
        email: 'alexandre.moraes@escola.com',
    }
  });
  const professor2 = await prisma.professor.create({
    data: {
        nome:'Ronaldo Machado',
        disciplina: 'Português',
        email: 'ronaldo.machado@escola.com',
    }
  });
  const boletim1 = await prisma.boletim.create({
    data: {
        id_aluno: 1,
        id_professor: 1,
        matematica: 8,
        portugues: 7,
        historia: 9,
        ciencias: 6.5,
        ingles: 7.5,
        media: (8 + 7 + 9 + 6.5 + 7.5) / 5
    }
  });
  const boletim2 = await prisma.boletim.create({
    data: {
        id_aluno: 2,
        id_professor: 2,
        matematica: 9,
        portugues: 6,
        historia: 8,
        ciencias: 7.5,
        ingles: 8,
        media: (9 + 6 + 8 + 7.5 + 8) / 5
  }
});   
      
console.log('Alunos, professores e boletins inseridos:', { aluno1, aluno2, professor1, professor2, boletim1, boletim2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
  