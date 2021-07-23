import React from 'react';
import Navbar from '../Navbar/Navbar';

function ManualEntryMobile({
	settings,
	distributers,
	categories,
	saveItemData,
	itemData,
	setItemData,
}) {
	return (
		<>
			<Navbar />
			<div className='inventory-container-m'>
				<h1 className='dash-heading-m'>Take Inventory</h1>
				<hr className='dash-line-m' />
				{settings.length === 0 ? (
					<center>
						<p className='inventory-settings'>
							<b>
								Attention! Please set your distributers,
								threshold, and categories on the Settings page
								before taking inventory.
							</b>
						</p>
					</center>
				) : null}
				<div className='take-inventory'>
					<center>
						<form className='manual-form' onSubmit={saveItemData}>
							<label htmlFor='product'>Product name:</label>
							<br />
							<input
								name='product'
								type='text'
								id='product-entry-m'
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
								id='barcode-entry-m'
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
								id='product-entry-m'
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
							<p className='threshold-info-m'>
								{settings.length === 0
									? 'Please set your desired distributers, threshold, and categories on the Settings page.'
									: 'Your threshold is currently set to ' +
									  settings[0].threshold +
									  '.'}
							</p>
							<p>
								Which distributer do you typically order this
								product from?
							</p>
							<select
								name='distributer'
								id='distributer-select-m'
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
							<p>Which category does this product belong to?</p>
							<select
								name='category'
								id='category-select-m'
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
							<button className='save-quantity-m' type='submit'>
								Save This Item
							</button>
						</form>
					</center>
				</div>
			</div>
		</>
	);
}

export default ManualEntryMobile;
