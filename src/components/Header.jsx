// Renders the Header component
function Header({pages, setPageState}) {
    return <>
        <div className="header">
            <p className="shop-name">ShopEase</p>
            <section className="nav">
                {/* Iterate through each page in the pages array and add its value to the navigation section */}
                {pages.map((page) => (
                    <p className="nav-link" key={page} onClick={() => setPageState(page)}>{page}</p>
                ))}
            </section>
        </div>
    </>
}
export default Header;