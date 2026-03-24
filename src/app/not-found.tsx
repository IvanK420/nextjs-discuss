import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div>
      <h2>404 - Not Found</h2>
      <p>Page non trouvée</p>
      <Link href="/">Retourner à l'accueil</Link>
    </div>
  )
}