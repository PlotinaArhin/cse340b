exports.wrapVehicleInHTML = (vehicle) => {
    const price = vehicle.inv_price.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
    const mileage = vehicle.inv_miles.toLocaleString();
    return `
      <div class="vehicle-detail">
        <img src="${vehicle.inv_image}" 
             alt="${vehicle.inv_make} ${vehicle.inv_model} full-size image" 
             class="vehicle-image">
        <div class="vehicle-info">
          <h2>${vehicle.inv_year} ${vehicle.inv_make} ${vehicle.inv_model}</h2>
          <p><strong>Price:</strong> ${price}</p>
          <p><strong>Mileage:</strong> ${mileage} miles</p>
          <p><strong>Description:</strong> ${vehicle.inv_description}</p>
          <p><strong>Color:</strong> ${vehicle.inv_color}</p>
        </div>
      </div>
    `;
  };