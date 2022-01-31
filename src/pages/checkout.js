import Image from "next/image";
import { useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import Header from "../components/Header";
import { selectItems, SelectTotal } from "../slices/basketSlice";
import Currency from "react-currency-formatter";
import { useSession } from "next-auth/react";

const Checkout = () => {
	const items = useSelector(selectItems);
	const total = useSelector(SelectTotal);
	const { data: session } = useSession();

	return (
		<div className="bg-gray-100">
			<Header />
			<main className="lg:flex max-w-screen-2xl mx-auto">
				{/* LEFT PART */}
				<div className="flex-grow m-5 shadow-sm">
					<Image
						src="https://links.papareact.com/ikj"
						width="1020"
						height="250"
						objectFit="contain"
					/>
					<div className="flex flex-col p-5 space-y-10 bg-white">
						<h1 className="text-3xl border-b pb-4">
							{items.length === 0 ? "Your Cart is Empty" : "Your Shopping Cart"}
						</h1>
						{items.map((item, i) => (
							<CartItem
								key={i}
								id={item.id}
								title={item.title}
								price={item.price}
								description={item.description}
								category={item.category}
								image={item.image}
								rating={item.rating}
								isPrime={item.isPrime}
							/>
						))}
					</div>
				</div>

				{/* RIGHT PART */}
				<div className="flex flex-col bg-white p-10 shadow-md">
					{items.length > 0 && (
						<>
							<h2 className="whitespace-nowrap">
								Subtotal ({items.length} items):{" "}
								<span className="font-bold">
									<Currency quantity={total} currency="USD" />
								</span>
							</h2>
							<button
								disabled={!session}
								className={`button mt-2 ${
									!session &&
									"from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"
								}`}
							>
								{!session ? "Sign in to checkout" : "Proceed to checkout"}
							</button>
						</>
					)}
				</div>
			</main>
		</div>
	);
};

export default Checkout;
