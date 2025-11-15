INSERT INTO Desarrollador (nombre) VALUES
('CD Projekt Red'),
('Rockstar Games'),
('Nintendo EAD'),
('Valve Corporation'),
('Larian Studios'),
('FromSoftware'),
('Mojang Studios'),
('Epic Games'),
('Square Enix'),
('Riot Games'),
('Electronic Arts'),
('Ubisoft'),
('Blizzard Entertainment'),
('Guerrilla Games'),
('Team Cherry');

INSERT INTO Videojuego (nombre, descripcion, precio, id_desarrollador, fecha_lanzamiento, requiere_online, espacio_minimo, clasificacion, genero, plataforma, url_portada) VALUES
('The Witcher 3: Wild Hunt', 'Un RPG de fantasía oscura masivo.', 29.99, 1, '2015-05-19', FALSE, 50, 'M', 'rpg', 'pc', 'the_witcher_3.jpg'),
('Red Dead Redemption 2', 'Una épica historia de forajidos en el Viejo Oeste.', 59.99, 2, '2018-10-26', TRUE, 150, 'M', 'aventura', 'playstation', 'red_dead_redemption_2.jpg'),
('The Legend of Zelda: BOTW', 'Una aventura épica en un mundo abierto.', 49.99, 3, '2017-03-03', FALSE, 15, 'E', 'aventura', 'nintendo', 'the_legend_of_zelda_botw.jpg'),
('Cyberpunk 2077', 'Un RPG de mundo abierto ambientado en Night City.', 39.99, 1, '2020-12-10', FALSE, 70, 'M', 'rpg', 'pc', 'cyberpunk_2077.jpeg'),
('Half-Life 2', 'Un clásico shooter en primera persona.', 9.99, 4, '2004-11-16', FALSE, 10, 'T', 'accion', 'pc', 'halflife_2.jpg'),
('Baldur''s Gate 3', 'Un RPG por turnos con gran profundidad narrativa.', 59.99, 5, '2023-08-03', TRUE, 125, 'M', 'rpg', 'pc', 'baldurs_gate_3.jpg'),
('Elden Ring', 'Un RPG de acción desafiante en un vasto mundo.', 49.99, 6, '2022-02-25', TRUE, 60, 'M', 'accion', 'xbox', 'elden_ring.jpg'),
('Minecraft', 'Juego de construcción y supervivencia con bloques.', 26.95, 7, '2011-11-18', TRUE, 1, 'E', 'simulacion', 'pc', 'minecraft.jpg'),
('Fortnite', 'Battle Royale masivo y construcción.', 0.00, 8, '2017-07-25', TRUE, 30, 'T', 'accion', 'movil', 'fortnite.jpg'),
('Final Fantasy XVI', 'Una épica de acción y fantasía.', 69.99, 9, '2023-06-22', FALSE, 100, 'M', 'rpg', 'playstation', 'final_fantasy_16.jpg'),
('Valorant', 'Shooter táctico 5v5 basado en personajes.', 0.00, 10, '2020-06-02', TRUE, 20, 'T', 'accion', 'pc', 'valorant.jpg'),
('FIFA 25', 'Juego de simulación de fútbol.', 69.99, 11, '2024-09-27', TRUE, 50, 'E', 'deportes', 'xbox', 'fiffa_25.jpg'),
('Assassin''s Creed Valhalla', 'Aventura en la era vikinga.', 39.99, 12, '2020-11-10', FALSE, 75, 'M', 'aventura', 'pc', 'assasins_creed_valhalla.jpg'),
('Diablo IV', 'Action RPG con enfoque en el multijugador.', 69.99, 13, '2023-06-05', TRUE, 90, 'M', 'rpg', 'playstation', 'diablo_4.jpg'),
('Horizon Zero Dawn', 'Aventura post-apocalíptica con máquinas.', 19.99, 14, '2017-02-28', FALSE, 60, 'T', 'accion', 'pc', 'horizon-zero-dawn.jpg'),
('Hollow Knight', 'Metroidvania de exploración y plataformas.', 14.99, 15, '2017-02-24', FALSE, 9, 'E', 'aventura', 'nintendo', 'hollow_knight.jpg'),
('Stardew Valley', 'Simulación de granja y RPG.', 14.99, 1, '2016-02-26', FALSE, 5, 'E', 'simulacion', 'pc', 'stardew_valley.jpg'),
('StarCraft II: Legacy of the Void', 'Estrategia en tiempo real de ciencia ficción.', 0.00, 13, '2015-11-10', TRUE, 25, 'T', 'estrategia', 'pc', 'star_craft_2_legacy_of_the_void.jpg'),
('Grand Theft Auto V', 'Aventura de acción en mundo abierto.', 29.99, 2, '2013-09-17', TRUE, 100, 'M', 'accion', 'playstation', 'gta_5.jpg'),
('Mario Kart 8 Deluxe', 'Juego de carreras arcade.', 59.99, 3, '2017-04-28', TRUE, 8, 'E', 'deportes', 'nintendo', 'mario_kart_8_deluxe.jpg');

INSERT INTO Usuario (email, password_hash, usuario, nombre, apellido, direccion, rol) VALUES
('admin@store.com', 'hash_admin_01', 'MasterAdmin', 'Alfredo', 'González', 'Av. Central 123, Ciudad Admin', 'cliente'),
('cliente_a@mail.com', 'hash_cliente_a', 'FanDelRPG', 'Beatriz', 'López', 'Calle Ficción 45, Distrito Role', 'cliente'),
('cliente_b@mail.com', 'hash_cliente_b', 'EstrategiaPro', 'Carlos', 'Martínez', 'Blvd. Táctica 890, Zona Específica', 'cliente'),
('cliente_c@mail.com', 'hash_cliente_c', 'CazadorMaquina', 'Diana', 'Rodríguez', 'Paseo Hardware 11, Sector PC', 'cliente'),
('cliente_d@mail.com', 'hash_cliente_d', 'MovilGamer', 'Eduardo', 'Sánchez', 'Vía Táctil 222, Urb. Portátil', 'cliente'),
('cliente_e@mail.com', 'hash_cliente_e', 'RetroFan', 'Fernanda', 'Díaz', 'Ruta Clásica 33, Aldea Vintage', 'cliente'),
('cliente_f@mail.com', 'hash_cliente_f', 'SimuladorJuan', 'Juan', 'Pérez', 'Carrera de Aviones 40, Ciudad Virtual', 'cliente'),
('cliente_g@mail.com', 'hash_cliente_g', 'PlayFanatic', 'Gabriela', 'Torres', 'Avenida DualShock 5, Barrio Consola', 'cliente'),
('cliente_h@mail.com', 'hash_cliente_h', 'NintendoHero', 'Hugo', 'Ramírez', 'Camino del Hongo 64, Reino Switch', 'cliente'),
('cliente_i@mail.com', 'hash_cliente_i', 'Free2PlayUser', 'Irene', 'Castro', 'Calle Ofertas 77, Distrito Gratuito', 'cliente');

-- Función para obtener ID de usuario por nombre (para simplificar)
CREATE OR REPLACE FUNCTION get_user_id(p_usuario VARCHAR) RETURNS INT AS $$
BEGIN
    RETURN (SELECT id FROM Usuario WHERE usuario = p_usuario);
END;
$$ LANGUAGE plpgsql;

INSERT INTO Pedido (usuario_id, fecha_creacion, estado, total) VALUES
(get_user_id('FanDelRPG'), '2024-08-15', 'completado', 89.98),  -- Pedido 1
(get_user_id('EstrategiaPro'), '2024-09-01', 'completado', 0.00), -- Pedido 2 (Juego F2P)
(get_user_id('CazadorMaquina'), '2024-09-10', 'pendiente', 19.99), -- Pedido 3
(get_user_id('MovilGamer'), '2024-09-15', 'cancelado', 0.00),    -- Pedido 4 (Juego F2P)
(get_user_id('RetroFan'), '2024-10-01', 'completado', 24.98),    -- Pedido 5
(get_user_id('SimuladorJuan'), '2024-10-10', 'pendiente', 41.94),  -- Pedido 6
(get_user_id('PlayFanatic'), '2024-10-20', 'completado', 159.97), -- Pedido 7 (Varios juegos caros)
(get_user_id('NintendoHero'), '2024-11-01', 'completado', 109.98), -- Pedido 8
(get_user_id('FanDelRPG'), '2024-11-15', 'pendiente', 59.99),  -- Pedido 9
(get_user_id('EstrategiaPro'), '2024-11-20', 'completado', 0.00); -- Pedido 10

-- Función para obtener ID de videojuego por nombre (para simplificar)
CREATE OR REPLACE FUNCTION get_game_id(p_nombre TEXT) RETURNS INT AS $$
BEGIN
    RETURN (SELECT id FROM Videojuego WHERE nombre = p_nombre);
END;
$$ LANGUAGE plpgsql;

INSERT INTO PedidoVideojuego (pedido_id, videojuego_id, cantidad) VALUES
-- Pedido 1 (FanDelRPG - Completado: TW3 + Cyberpunk)
(1, get_game_id('The Witcher 3: Wild Hunt'), 1),
(1, get_game_id('Cyberpunk 2077'), 1),

-- Pedido 2 (EstrategiaPro - Completado: StarCraft II)
(2, get_game_id('StarCraft II: Legacy of the Void'), 1),

-- Pedido 3 (CazadorMaquina - Pendiente: Horizon Zero Dawn)
(3, get_game_id('Horizon Zero Dawn'), 1),

-- Pedido 4 (MovilGamer - Cancelado: Fortnite)
(4, get_game_id('Fortnite'), 1),

-- Pedido 5 (RetroFan - Completado: Half-Life 2 + Hollow Knight)
(5, get_game_id('Half-Life 2'), 1),
(5, get_game_id('Hollow Knight'), 1),

-- Pedido 6 (SimuladorJuan - Pendiente: Minecraft + Stardew Valley)
(6, get_game_id('Minecraft'), 1),
(6, get_game_id('Stardew Valley'), 1),

-- Pedido 7 (PlayFanatic - Completado: RDR 2 + FF XVI + GTA V + Diablo IV)
(7, get_game_id('Red Dead Redemption 2'), 1),
(7, get_game_id('Final Fantasy XVI'), 1),
(7, get_game_id('Grand Theft Auto V'), 1),
(7, get_game_id('Diablo IV'), 1),

-- Pedido 8 (NintendoHero - Completado: Zelda BOTW + Mario Kart 8 Deluxe + Hollow Knight)
(8, get_game_id('The Legend of Zelda: BOTW'), 1),
(8, get_game_id('Mario Kart 8 Deluxe'), 1),
(8, get_game_id('Hollow Knight'), 1),

-- Pedido 9 (FanDelRPG - Pendiente: Baldur's Gate 3)
(9, get_game_id('Baldur''s Gate 3'), 1),

-- Pedido 10 (EstrategiaPro - Completado: Valorant)
(10, get_game_id('Valorant'), 1);

INSERT INTO Carrito (usuario_id, videojuego_id, cantidad) VALUES
-- Carrito de CazadorMaquina
(get_user_id('CazadorMaquina'), get_game_id('Elden Ring'), 1),
(get_user_id('CazadorMaquina'), get_game_id('Assassin''s Creed Valhalla'), 1),

-- Carrito de PlayFanatic
(get_user_id('PlayFanatic'), get_game_id('FIFA 25'), 1),

-- Carrito de NintendoHero (2 copias del mismo juego)
(get_user_id('NintendoHero'), get_game_id('The Legend of Zelda: BOTW'), 2),

-- Carrito de Free2PlayUser (Un juego caro que está pensando comprar)
(get_user_id('Free2PlayUser'), get_game_id('Baldur''s Gate 3'), 1);

INSERT INTO Requisitos_PC (videojuego_id, so_minimo, cpu_minima, ram_minima, gpu_minima) VALUES
-- Juegos de PC con Requisitos Específicos (IDs 1, 4, 5, 6, 8, 11, 13, 15, 17, 18)
((SELECT id FROM Videojuego WHERE nombre = 'The Witcher 3: Wild Hunt'), 'Windows 7 (64-bit)', 'Intel Core i5-2500K', 6, 'NVIDIA GTX 660'),
((SELECT id FROM Videojuego WHERE nombre = 'Cyberpunk 2077'), 'Windows 10 (64-bit)', 'Intel Core i7-6700K', 12, 'NVIDIA RTX 2060'),
((SELECT id FROM Videojuego WHERE nombre = 'Half-Life 2'), 'Windows XP', '1.7 GHz Processor', 1, 'DirectX 8.1 compatible'),
((SELECT id FROM Videojuego WHERE nombre = 'Baldur''s Gate 3'), 'Windows 10 (64-bit)', 'Intel Core i5-8400', 8, 'NVIDIA GTX 970'),
((SELECT id FROM Videojuego WHERE nombre = 'Minecraft'), 'Windows 7 (64-bit)', 'Intel Core i3-3210', 4, 'Intel HD Graphics 4000'),
((SELECT id FROM Videojuego WHERE nombre = 'Valorant'), 'Windows 10 (64-bit)', 'Intel Core i3-4150', 4, 'NVIDIA GeForce GT 730'),
((SELECT id FROM Videojuego WHERE nombre = 'Assassin''s Creed Valhalla'), 'Windows 10 (64-bit)', 'Intel Core i5-4460', 8, 'NVIDIA GeForce GTX 960'),
((SELECT id FROM Videojuego WHERE nombre = 'Horizon Zero Dawn'), 'Windows 10 (64-bit)', 'Intel Core i5-2500K', 8, 'NVIDIA GTX 780'),
((SELECT id FROM Videojuego WHERE nombre = 'Stardew Valley'), 'Windows Vista', '2 GHz Processor', 2, '256 MB VRAM'),
((SELECT id FROM Videojuego WHERE nombre = 'StarCraft II: Legacy of the Void'), 'Windows 7 (64-bit)', 'Intel Core i3', 4, 'NVIDIA GeForce GT 330'),

-- Juegos de Consola/Móvil con Requisitos de Referencia/Portabilidad
((SELECT id FROM Videojuego WHERE nombre = 'Red Dead Redemption 2'), 'Windows 10 (64-bit)', 'Intel Core i5-2500K', 8, 'NVIDIA GeForce GTX 770'),
((SELECT id FROM Videojuego WHERE nombre = 'The Legend of Zelda: BOTW'), 'Windows 10 (64-bit)', 'Intel Core i5 (8th Gen)', 8, 'NVIDIA GTX 1060'),
((SELECT id FROM Videojuego WHERE nombre = 'Elden Ring'), 'Windows 10 (64-bit)', 'Intel Core i5-8400', 12, 'NVIDIA GeForce GTX 1060'),
((SELECT id FROM Videojuego WHERE nombre = 'Fortnite'), 'Windows 7/8/10 (64-bit)', 'Intel Core i3 2.4 GHz', 4, 'Intel HD 4000'),
((SELECT id FROM Videojuego WHERE nombre = 'Final Fantasy XVI'), 'Windows 10 (64-bit)', 'Intel Core i7 (10th Gen)', 16, 'NVIDIA RTX 3070'),
((SELECT id FROM Videojuego WHERE nombre = 'FIFA 25'), 'Windows 10 (64-bit)', 'Intel Core i5-6600K', 8, 'NVIDIA GeForce GTX 1050 Ti'),
((SELECT id FROM Videojuego WHERE nombre = 'Diablo IV'), 'Windows 10 (64-bit)', 'Intel Core i5-2500K', 8, 'NVIDIA GeForce GTX 660'),
((SELECT id FROM Videojuego WHERE nombre = 'Hollow Knight'), 'Windows 7 (64-bit)', 'Intel Core 2 Duo E4500', 4, 'GeForce 9800 GTX'),
((SELECT id FROM Videojuego WHERE nombre = 'Grand Theft Auto V'), 'Windows 7 (64-bit)', 'Intel Core 2 Quad Q6600', 4, 'NVIDIA 9800 GT'),
((SELECT id FROM Videojuego WHERE nombre = 'Mario Kart 8 Deluxe'), 'Windows 10 (64-bit)', 'Intel Core i5 (7th Gen)', 8, 'NVIDIA GTX 970');