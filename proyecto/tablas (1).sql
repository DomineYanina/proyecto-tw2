-- 1. ENUM para el estado de Pedido
CREATE TYPE EstadoPedido AS ENUM ('pendiente', 'completado', 'cancelado');

-- 2. ENUM para la clasificación de Videojuego
CREATE TYPE ClasificacionVideojuego AS ENUM ('E', 'T', 'M', 'AO', 'RP'); -- Ejemplos ESRB

-- 3. ENUM para el género de Videojuego
CREATE TYPE GeneroVideojuego AS ENUM ('accion', 'aventura', 'rpg', 'estrategia', 'deportes', 'simulacion', 'otros');

-- 4. ENUM para la plataforma de Videojuego
CREATE TYPE PlataformaVideojuego AS ENUM ('pc', 'playstation', 'xbox', 'nintendo', 'movil');

-- 5. ENUM para el rol de Usuario
CREATE TYPE RolUsuario AS ENUM ('cliente', 'administrador');

---

CREATE TABLE Desarrollador (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL
);

---

CREATE TABLE Videojuego (
    id SERIAL PRIMARY KEY,
	nombre TEXT,
	descripcion TEXT,
	precio DOUBLE PRECISION,
	id_desarrollador INT NOT NULL,
	fecha_lanzamiento DATE NOT NULL,
	requiere_online BOOLEAN NOT NULL DEFAULT FALSE,
	espacio_minimo INT NOT NULL,
	clasificacion ClasificacionVideojuego NOT NULL DEFAULT 'E', -- Usando el ENUM
	genero GeneroVideojuego NOT NULL DEFAULT 'otros',          -- Usando el ENUM
	plataforma PlataformaVideojuego NOT NULL DEFAULT 'pc',     -- Usando el ENUM (Corregido: se quitó el ';')
	url_portada VARCHAR(255),

	CONSTRAINT fk_id_desarrollador
	FOREIGN KEY (id_desarrollador) REFERENCES Desarrollador(id)
); -- Corregido: se añadió el paréntesis de cierre ')'

---

CREATE TABLE Requisitos_PC (
    id SERIAL PRIMARY KEY,
    so_minimo VARCHAR(255) NOT NULL,
    videojuego_id INT UNIQUE NOT NULL, -- UNIQUE porque un videojuego solo tiene 1 requisito PC
    cpu_minima VARCHAR(255) NOT NULL,
    ram_minima INT NOT NULL,
    gpu_minima VARCHAR(255) NOT NULL,
    
    CONSTRAINT fk_videojuego_id
    FOREIGN KEY (videojuego_id) REFERENCES Videojuego(id) ON DELETE CASCADE
    -- ON DELETE CASCADE: Si se elimina el videojuego, sus requisitos_pc también se eliminan (composición)
);

---

CREATE TABLE Usuario (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL, -- Almacenar el hash de la contraseña
    usuario VARCHAR(255) UNIQUE NOT NULL,
	nombre VARCHAR(255) NOT NULL,
	apellido VARCHAR(255) NOT NULL,
	direccion VARCHAR(255) NOT NULL,
    rol RolUsuario NOT NULL DEFAULT 'cliente' -- Usando el ENUM
    -- Las listas de Videojuego (carrito) y Pedido (pedidos) se manejan con tablas de relación/unión o desde el lado de Pedido/Videojuego
);

---

CREATE TABLE Pedido (
    id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL,
    fecha_creacion DATE NOT NULL DEFAULT CURRENT_DATE,
    estado EstadoPedido NOT NULL DEFAULT 'pendiente', -- Usando el ENUM
    total DOUBLE PRECISION NOT NULL,
    
    CONSTRAINT fk_usuario_id
    FOREIGN KEY (usuario_id) REFERENCES Usuario(id)
);

---

CREATE TABLE PedidoVideojuego (
    pedido_id INT NOT NULL,
    videojuego_id INT NOT NULL,
    cantidad INT NOT NULL DEFAULT 1, -- Puedes agregar una columna de cantidad si un mismo videojuego puede estar varias veces en un pedido
    
    PRIMARY KEY (pedido_id, videojuego_id), -- Clave primaria compuesta
    
    CONSTRAINT fk_pedido_id
    FOREIGN KEY (pedido_id) REFERENCES Pedido(id) ON DELETE CASCADE,
    
    CONSTRAINT fk_videojuego_del_pedido_id
    FOREIGN KEY (videojuego_id) REFERENCES Videojuego(id) ON DELETE RESTRICT
    -- ON DELETE RESTRICT: No permite eliminar un videojuego si está en un pedido
);

---

CREATE TABLE Carrito (
    usuario_id INT NOT NULL,
    videojuego_id INT NOT NULL,
    cantidad INT NOT NULL DEFAULT 1, -- Puedes agregar una columna de cantidad si un mismo videojuego puede estar varias veces en un pedido
    
    PRIMARY KEY (usuario_id, videojuego_id), -- Clave primaria compuesta
    
    CONSTRAINT fk_usuario_id
    FOREIGN KEY (usuario_id) REFERENCES Usuario(id) ON DELETE CASCADE,
    
    CONSTRAINT fk_videojuego_del_carrito_id
    FOREIGN KEY (videojuego_id) REFERENCES Videojuego(id) ON DELETE RESTRICT
    -- ON DELETE RESTRICT: No permite eliminar un videojuego si está en un pedido
);