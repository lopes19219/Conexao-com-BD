import { pool } from './database.js';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

interface Usuario extends RowDataPacket {
  id: number;
  nome: string;
  email: string;
  criado_em: Date;
}

async function executarAtividade() {
  try {
    console.log('🔄 Conectando ao MySQL...');

    // 1. Inserir um novo utilizador
    const [resultadoInsercao] = await pool.query<ResultSetHeader>(
      'INSERT INTO usuarios (nome, email) VALUES (?, ?)',
      ['Gabriel Lopes', `gabriel.${Date.now()}@exemplo.com`]
    );
    console.log(`✅ Utilizador inserido com sucesso! ID: ${resultadoInsercao.insertId}`);

    // 2. Consultar os utilizadores cadastrados
    const [usuarios] = await pool.query<Usuario[]>('SELECT * FROM usuarios');
    console.log('\n📋 Lista de Utilizadores no Banco de Dados:');
    console.table(usuarios);

  } catch (erro) {
    console.error('❌ Erro durante a execução:', erro);
  } finally {
    await pool.end();
    console.log('\n🔌 Conexão encerrada.');
  }
}

executarAtividade();