-- CreateEnum
CREATE TYPE "clasificacionvideojuego" AS ENUM ('E', 'T', 'M', 'AO', 'RP');

-- CreateEnum
CREATE TYPE "estadopedido" AS ENUM ('pendiente', 'completado', 'cancelado');

-- CreateEnum
CREATE TYPE "generovideojuego" AS ENUM ('accion', 'aventura', 'rpg', 'estrategia', 'deportes', 'simulacion', 'otros');

-- CreateEnum
CREATE TYPE "plataformavideojuego" AS ENUM ('pc', 'playstation', 'xbox', 'nintendo', 'movil');

-- CreateEnum
CREATE TYPE "rolusuario" AS ENUM ('cliente', 'administrador');

-- CreateTable
CREATE TABLE "carrito" (
    "usuario_id" INTEGER NOT NULL,
    "videojuego_id" INTEGER NOT NULL,
    "cantidad" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "carrito_pkey" PRIMARY KEY ("usuario_id","videojuego_id")
);

-- CreateTable
CREATE TABLE "desarrollador" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(255) NOT NULL,

    CONSTRAINT "desarrollador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pedido" (
    "id" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "fecha_creacion" DATE NOT NULL DEFAULT CURRENT_DATE,
    "estado" "estadopedido" NOT NULL DEFAULT 'pendiente',
    "total" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "pedido_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pedidovideojuego" (
    "pedido_id" INTEGER NOT NULL,
    "videojuego_id" INTEGER NOT NULL,
    "cantidad" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "pedidovideojuego_pkey" PRIMARY KEY ("pedido_id","videojuego_id")
);

-- CreateTable
CREATE TABLE "requisitos_pc" (
    "id" SERIAL NOT NULL,
    "so_minimo" VARCHAR(255) NOT NULL,
    "videojuego_id" INTEGER NOT NULL,
    "cpu_minima" VARCHAR(255) NOT NULL,
    "ram_minima" INTEGER NOT NULL,
    "gpu_minima" VARCHAR(255) NOT NULL,

    CONSTRAINT "requisitos_pc_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuario" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password_hash" VARCHAR(255) NOT NULL,
    "usuario" VARCHAR(255) NOT NULL,
    "nombre" VARCHAR(255) NOT NULL,
    "apellido" VARCHAR(255) NOT NULL,
    "direccion" VARCHAR(255) NOT NULL,
    "rol" "rolusuario" NOT NULL DEFAULT 'cliente',

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "videojuego" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT,
    "descripcion" TEXT,
    "precio" DOUBLE PRECISION,
    "id_desarrollador" INTEGER NOT NULL,
    "fecha_lanzamiento" DATE NOT NULL,
    "requiere_online" BOOLEAN NOT NULL DEFAULT false,
    "espacio_minimo" INTEGER NOT NULL,
    "clasificacion" "clasificacionvideojuego" NOT NULL DEFAULT 'E',
    "genero" "generovideojuego" NOT NULL DEFAULT 'otros',
    "plataforma" "plataformavideojuego" NOT NULL DEFAULT 'pc',
    "url_portada" VARCHAR,

    CONSTRAINT "videojuego_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "requisitos_pc_videojuego_id_key" ON "requisitos_pc"("videojuego_id");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_usuario_key" ON "usuario"("usuario");

-- AddForeignKey
ALTER TABLE "carrito" ADD CONSTRAINT "fk_usuario_id" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "carrito" ADD CONSTRAINT "fk_videojuego_del_carrito_id" FOREIGN KEY ("videojuego_id") REFERENCES "videojuego"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pedido" ADD CONSTRAINT "fk_usuario_id" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pedidovideojuego" ADD CONSTRAINT "fk_pedido_id" FOREIGN KEY ("pedido_id") REFERENCES "pedido"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pedidovideojuego" ADD CONSTRAINT "fk_videojuego_del_pedido_id" FOREIGN KEY ("videojuego_id") REFERENCES "videojuego"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "requisitos_pc" ADD CONSTRAINT "fk_videojuego_id" FOREIGN KEY ("videojuego_id") REFERENCES "videojuego"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "videojuego" ADD CONSTRAINT "fk_id_desarrollador" FOREIGN KEY ("id_desarrollador") REFERENCES "desarrollador"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
