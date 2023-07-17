import { useRouter } from "next/router";
import { useSettings } from "../context/settings";

function Index() {
	const { push } = useRouter();
	const { setShowSettings } = useSettings();
	return (
		<div className="h-full flex-1 flex">
			<div style={{backgroundPosition: '50% 90%'}} className="flex-1 md:flex md:items-center md:justify-center bg-no-repeat bg-contain bg-[url('/hero-image.png')] xl:bg-none">
				<div className="flex flex-col mt-14 md:m-auto px-2 py-4 items-center justify-center bg-white bg-opacity-70">
					<div className="title my-2">
						<h2 className="text-6xl text-center font-bold">TEST YOUR KNOWLEDGE</h2>
					</div>
					<div className="intro max-w-xl my-2">
						<p className="p-5 text-base text-center">Velit nostrud eiusmod nostrud amet deserunt qui ut id Lorem enim quis. Proident pariatur et deserunt incididunt ullamco labore excepteur nostrud. Dolore id dolore irure amet dolore aute anim velit. Exercitation incididunt ullamco nisi quis veniam. Do mollit incididunt fugiat ullamco in amet laboris sit enim.</p>
					</div>
					<div className="action my-2">
						<button
							type="button"
							onClick={() => push('/settings')}
							className="px-4 py-2 font-semibold text-lg bg-secondary rounded-full no-underline text-white hover:-translate-y-1 hover:scale-110 transition ease-linear duration-300"
						>
							Take Quizz
						</button>
					</div>
				</div>
			</div>
			<div style={{backgroundPosition: '0% 50%'}} className="hero-section hidden xl:block flex-1 bg-no-repeat bg-contain bg-[url('/hero-image.png')]"></div>
		</div>
	);
}

export default Index