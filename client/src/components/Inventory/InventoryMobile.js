import React from 'react';
import Navbar from '../Navbar/Navbar';
import { Link } from 'react-router-dom';
import bottle from '../../images/stock_bottle.png';
import check from '../../images/check.png';
import Slider, { SliderTooltip } from 'rc-slider';
import 'rc-slider/assets/index.css';

function InventoryMobile({
	settings,
	user,
	bottleQuantity,
	setBottleQuantity,
	sliderQuantity,
	setSliderQuantity,
	distributers,
	categories,
	getVideoStream,
	saveItemData,
	itemData,
	setItemData,
	turnGreen,
	setTurnGreen,
	successScan,
	setSuccessScan,
}) {
	//slider
	const { createSliderWithTooltip } = Slider;
	const Range = createSliderWithTooltip(Slider.Range);
	const { Handle } = Slider;

	const handle = (props) => {
		const { value, dragging, index, ...restProps } = props;
		return (
			<SliderTooltip
				prefixCls='rc-slider-tooltip'
				overlay={`.${value}`}
				visible={dragging}
				placement='right'
				key={index}
			>
				<Handle value={value} {...restProps} />
			</SliderTooltip>
		);
	};

	return (
		<>
			<Navbar />
			<div className='inventory-container-m'>
				<h1 className='dash-heading-m'>Take Inventory</h1>
				<hr className='dash-line-m' />
				<div className='take-inventory'>
					{Boolean(window.BarcodeDetector) === false ? (
						<p id='message'>
							Barcode detection is not supported in your browser.
							To manually enter inventory,{' '}
							<Link
								to='/manual-entry'
								className='manual-link-force'
							>
								click here.
							</Link>
						</p>
					) : (
						<>
							<h3>
								Begin scanning below, or{' '}
								<Link
									to='/manual-entry'
									className='manual-link'
								>
									click here
								</Link>{' '}
								if you'd like to enter inventory manually.
							</h3>
							{settings.length === 0 ? (
								<center>
									<p className='inventory-settings'>
										<b>
											Attention! Please set your
											distributers, threshold, and
											categories on the Settings page
											before taking inventory.
										</b>
									</p>
								</center>
							) : null}
							<p className='barcode-p'>Scan barcode:</p>
							<center>
								<div id='video-container'>
									{successScan === false ? (
										<>
											<video
												id='video'
												className='video-view'
												height='300px'
												width='90%'
												autoPlay
												playsInline
												onCanPlay={getVideoStream()}
											/>
											{itemData.nameOfItem === '' ? (
												<p className='searching'>
													(Searching for barcode...)
												</p>
											) : null}
										</>
									) : (
										<img
											src={check}
											alt='check mark image'
										/>
									)}
								</div>
								<p className='barcode-p'>Scanned item:</p>
								<div className='item-info'>
									<p>
										{itemData?.nameOfItem !== ''
											? itemData.nameOfItem
											: 'No item scanned yet.'}
									</p>
								</div>
								<button
									className='clear-scans-m'
									onClick={() => {
										setItemData({
											nameOfUser: user?.result?.name,
											creator:
												user?.result?.googleId ||
												user?.result?._id,
											lastUpdated:
												new Date().toDateString(),
											quantityRemaining: '',
											category: '',
											distributer: '',
											nameOfItem: '',
											barcode: '',
											image: '',
										});
										setBottleQuantity(0);
										setSliderQuantity(0);
										setSuccessScan(false);
									}}
								>
									Clear Scanned Item
								</button>
								<div className='set-amt-m'>
									{itemData?.image !== '' ? (
										<p>
											Use the slider below to represent
											quantity remaining. If the quantity
											remaining is at or below your set
											threshold, this item will be added
											to you order list.
										</p>
									) : null}
								</div>
								<div className='btl-img-div'>
									{itemData?.image !== '' ? (
										<div className='row align-items-center'>
											<div className='col-8'>
												<img
													className='btl-img'
													src={
														itemData.image ===
														undefined
															? bottle
															: itemData.image
													}
													alt='Scanned item image'
												/>
											</div>
											<div
												className='col-4'
												style={{
													float: 'left',
													width: 90,
													height: 400,
												}}
											>
												<Slider
													vertical
													min={0}
													max={99}
													step={1}
													defaultValue={0}
													handle={handle}
													onChange={(value) =>
														setSliderQuantity(value)
													}
													railStyle={{
														backgroundColor:
															'#3a4750',
														width: 10,
													}}
													trackStyle={{
														backgroundColor:
															'#ea9215',
														width: 10,
													}}
													handleStyle={{
														borderColor: '#3a4750',
														height: 20,
														width: 20,
													}}
												/>
											</div>
										</div>
									) : null}
								</div>
								{itemData.nameOfItem !== '' ? (
									<form onSubmit={saveItemData}>
										<p className='quantity'>
											Slider Quantity:{' '}
											<b>{'.' + sliderQuantity}</b>
										</p>
										<label
											className='quantity'
											htmlFor='full-bottles'
										>
											Full Bottles:
											{'    '}
										</label>
										<input
											className='bottle-entry'
											type='text'
											name='full-bottles'
											onChange={(e) =>
												setBottleQuantity(
													e.target.value,
												)
											}
										/>
										<p className='quantity'>
											Total Quantity:{' '}
											<b>
												{bottleQuantity +
													'.' +
													sliderQuantity}
											</b>
										</p>
										<p className='threshold-info-m'>
											{settings.length === 0
												? 'Please set your desired distributers, threshold, and categories on the Settings page.'
												: 'Your threshold is currently set to ' +
												  settings[0].threshold +
												  '.'}
										</p>
										<p>
											Which distributer do you typically
											order this product from?
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
													No Distributers Available -
													Set your Distributers on the
													Settings Page.
												</option>
											) : (
												distributers?.map(
													(dist, key) => (
														<option
															key={key}
															value={dist}
														>
															{dist}
														</option>
													),
												)
											)}
										</select>
										<p>
											Which category does this product
											belong to?
										</p>
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
													No Categories Available -
													Set your Categories on the
													Settings Page.
												</option>
											) : (
												categories?.map((cat, key) => (
													<option
														key={key}
														value={cat}
													>
														{cat}
													</option>
												))
											)}
										</select>
										<button
											className='save-quantity-m'
											type='submit'
											onClick={() =>
												setItemData({
													...itemData,
													quantityRemaining:
														bottleQuantity +
														'.' +
														sliderQuantity,
												})
											}
										>
											Save This Item
										</button>
									</form>
								) : null}
							</center>
						</>
					)}
				</div>
			</div>
		</>
	);
}

export default InventoryMobile;
