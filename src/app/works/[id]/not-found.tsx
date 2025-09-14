import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center',
      }}
    >
      <h2>作品が見つかりませんでした</h2>
      <p>指定された作品は存在しないか、削除されている可能性があります。</p>
      <Link href="/" style={{ marginTop: '20px' }}>
        ホームに戻る
      </Link>
    </div>
  );
}
