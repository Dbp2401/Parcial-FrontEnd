export default function Home() {
  return (
    <div class="content">
      <form action="/phone" method="GET">
        <input type="text" name="phone" placeholder="Telefono"></input>
        <button type="submit">Buscar Telefono</button>
      </form>
    </div>
  );
}
