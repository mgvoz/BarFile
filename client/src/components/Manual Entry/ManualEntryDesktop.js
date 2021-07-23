import React from 'react';
import Navbar from '../Navbar/Navbar';

function ManualEntryDesktop({
	settings,
	distributers,
	categories,
	saveItemData,
	itemData,
	setItemData,
}) {
	return (
		<div className='inventory-container'>
			<div className='row'>
				<div id='nav-section' className='col-3'>
					<Navbar />
				</div>
				<div className='col-9'>
					<h1 className='dash-heading'>Take Inventory</h1>
					<hr className='dash-line' />
					<center>
						{settings.length === 0 ? (
							<p className='inventory-settings'>
								<b>
									Attention! Please set your distributers,
									threshold, and categories on the Settings
									page before taking inventory.
								</b>
							</p>
						) : null}
						<div className='take-inventory'>
							<form
								className='manual-form'
								onSubmit={saveItemData}
							>
								<label htmlFor='product'>Product name:</label>
								<br />
								<input
									name='product'
									type='text'
									id='product-entry'
									required
									value={itemData.nameOfItem}
									onChange={(e) =>
										setItemData({
											...itemData,
											nameOfItem: e.target.value,
										})
									}
								/>
								<br />
								<label htmlFor='barcode'>Barcode:</label>
								<br />
								<input
									name='barcode'
									type='text'
									id='barcode-entry'
									required
									value={itemData.barcode}
									onChange={(e) =>
										setItemData({
											...itemData,
											barcode: e.target.value,
										})
									}
								/>
								<br />
								<label htmlFor='quantity'>
									Quantity remaining:
								</label>
								<br />
								<input
									name='quantity'
									type='text'
									id='quantity-entry'
									required
									value={itemData.quantityRemaining}
									onChange={(e) =>
										setItemData({
											...itemData,
											quantityRemaining: e.target.value,
										})
									}
								/>
								<br />
								<p className='threshold-info'>
									{settings.length === 0
										? 'Please set your desired distributers, threshold, and categories on the Settings page.'
										: 'Your threshold is currently set to ' +
										  settings[0].threshold +
										  '.'}
								</p>
								<p>
									Which distributer do you typically order
									this product from?
								</p>
								<select
									name='distributer'
									id='distributer-select'
									required
									onChange={(e) =>
										setItemData({
											...itemData,
											distributer: e.target.value,
										})
									}
								>
									<option selected disabled>
										Select Distributer
									</option>
									{settings[0]?.length === 0 ? (
										<option disabled>
											No Distributers Available - Set your
											Distributers on the Settings Page.
										</option>
									) : (
										distributers?.map((dist, key) => (
											<option key={key} value={dist}>
												{dist}
											</option>
										))
									)}
								</select>
								<br />
								<p>
									Which category does this product belong to?
								</p>
								<select
									name='category'
									id='category-select'
									required
									onChange={(e) =>
										setItemData({
											...itemData,
											category: e.target.value,
										})
									}
								>
									<option selected disabled>
										Select Category
									</option>
									{settings[0]?.length === 0 ? (
										<option disabled>
											No Categories Available - Set your
											Categories on the Settings Page.
										</option>
									) : (
										categories?.map((cat, key) => (
											<option key={key} value={cat}>
												{cat}
											</option>
										))
									)}
								</select>
								<br />
								<button className='save-quantity' type='submit'>
									Save This Item
								</button>
							</form>
						</div>
					</center>
				</div>
			</div>
		</div>
	);
}

export default ManualEntryDesktop;
