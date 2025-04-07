const utilities = {
  handleErrors: fn => (req, res, next) => 
    Promise.resolve(fn(req, res, next)).catch(next),

  getNav: async () => {
    // Implement your navigation logic here
    return '<nav>...</nav>';
  },

  buildVehicleDetailHTML: (vehicle) => {
    return `
      <div class="vehicle-detail-grid">
        <div class="vehicle-image">
          <img src="/images/vehicles/${vehicle.inv_image}" 
               alt="${vehicle.inv_make} ${vehicle.inv_model}">
        </div>
        <div class="vehicle-info">
          <h2>${vehicle.inv_year} ${vehicle.inv_make} ${vehicle.inv_model}</h2>
          <p class="price">${this.formatPrice(vehicle.inv_price)}</p>
          <p class="mileage">Mileage: ${this.formatMileage(vehicle.inv_miles)}</p>
          <p class="description">${vehicle.inv_description}</p>
        </div>
      </div>
    `;
  },

  formatPrice: (price) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price),

  formatMileage: (miles) => 
    new Intl.NumberFormat().format(miles)
};

module.exports = utilities;