-- CreateTable
CREATE TABLE "Aluno" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "turma" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "nascimento" DATE NOT NULL,

    CONSTRAINT "Aluno_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Professor" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "disciplina" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Professor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Boletim" (
    "id" SERIAL NOT NULL,
    "id_aluno" INTEGER NOT NULL,
    "id_professor" INTEGER NOT NULL,
    "matematica" DOUBLE PRECISION NOT NULL,
    "portugues" DOUBLE PRECISION NOT NULL,
    "historia" DOUBLE PRECISION NOT NULL,
    "ciencias" DOUBLE PRECISION NOT NULL,
    "ingles" DOUBLE PRECISION NOT NULL,
    "media" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Boletim_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Aluno_email_key" ON "Aluno"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Professor_email_key" ON "Professor"("email");

-- AddForeignKey
ALTER TABLE "Boletim" ADD CONSTRAINT "Boletim_id_aluno_fkey" FOREIGN KEY ("id_aluno") REFERENCES "Aluno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Boletim" ADD CONSTRAINT "Boletim_id_professor_fkey" FOREIGN KEY ("id_professor") REFERENCES "Professor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
