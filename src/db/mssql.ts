import sql, { ConnectionPool, config as SqlConfig } from 'mssql'

const config: SqlConfig = {
  user: process.env.DB_USER as string,
  password: process.env.DB_PASSWORD as string,
  server: process.env.DB_SERVER as string,
  port: parseInt(process.env.DB_PORT || '1433', 10),
  options: {
    trustServerCertificate: true, // 로컬 개발 환경에서 SSL 인증서를 신뢰할지 여부
  },
}

let pool: ConnectionPool | null = null

export async function connectToDatabase(): Promise<ConnectionPool> {
  try {
    if (!pool) {
      pool = await sql.connect(config)
    }
    return pool
  } catch (error) {
    console.error('Database connection failed: ', error)
    throw error
  }
}
