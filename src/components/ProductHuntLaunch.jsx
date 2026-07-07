const ProductHuntLaunch = () => {
  return (
    <section className="product-hunt-section">
      <div className="ph-card">
        <div className="ph-header">
          <img
            src="https://ph-files.imgix.net/2144f4ec-7827-403d-93b4-e1fcd6d03d8d.jpeg?auto=compress,format&codec=mozjpeg&cs=strip&fit=crop&h=80&w=80"
            alt="Frost Aura"
          />

          <div>
            <h3>Frost Aura</h3>
            <p>
              AI desk device that tracks hydration, focus & movement
            </p>
          </div>
        </div>

        <a
          href="https://www.producthunt.com/products/frost-aura?launch=frost-aura"
          target="_blank"
          rel="noopener noreferrer"
          className="ph-button"
        >
          🚀 Check us out on Product Hunt
        </a>
      </div>
    </section>
  );
};

export default ProductHuntLaunch;