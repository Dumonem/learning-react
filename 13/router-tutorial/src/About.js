import React from 'react';
import qs from 'qs';

const About = ({ location }) => {
	const query = qs.parse(location.search, {
		ignoreQueryPrefix: true, // 이설정으로 문자열 맨앞의 ? 생략
	});

	const showDetail = query.detail === 'true';

	return (
		<div>
			<h1>소개</h1>
			<p>이 프로젝트는 라우터 튜토리얼 실습 프로젝트 입니다.</p>
			{showDetail && <p>detail 값을 true 로 설정하셧군요!</p>}
		</div>
	);
};

export default About;
