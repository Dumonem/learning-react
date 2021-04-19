import React from 'react';
import './App.css';

function App() {
	const name = '리액트';
	return (
		<>
			{/*주석 처리 방법*/}
			<div
				className="react" //시작 태그를 여러줄로 작성하게 된다면 여기에 그 주석을 작성 가능합니다
			>
				{name}
			</div>
			//하지만 여기에 이렇게 적으면 /*페이지에 노출됨*/
			<input />
		</>
	);
}

export default App;
