import Post from '../../models/post';
import mongoose from 'mongoose';
import Joi from 'joi';

const { ObjectId } = mongoose.Types;

export const getPostById = async (ctx, next) => {
	const { id } = ctx.params;
	if (!ObjectId.isValid(id)) {
		ctx.status = 400; //Bad Request
		return;
	}
	try {
		const post = await Post.findById(id);
		//포스트가 존재하지 않을때
		if (!post) {
			ctx.status = 404;
			return;
		}
		ctx.state.post = post;
		return next();
	} catch (e) {
		ctx.throw(500, e);
	}
};

/* 포스트 작성
 * POST /api/posts
 * {title:'제목', body:'내용',tags:['태그1','태그1']}
 * */
export const write = async (ctx) => {
	const schema = Joi.object().keys({
		//객체가 다음 필드를 가지고있는지 검증
		title: Joi.string().required(), //required() 필수체크
		body: Joi.string().required(),
		tags: Joi.array().items(Joi.string()).required(),
	});

	const result = schema.validate(ctx.request.body);
	if (result.error) {
		ctx.status = 400;
		ctx.body = result.error;
		return;
	}

	const { title, body, tags } = ctx.request.body;
	const post = new Post({
		title,
		body,
		tags,
		user: ctx.state.user,
	});
	try {
		await post.save();
		ctx.body = post;
	} catch (e) {
		ctx.throw(500, e);
	}
};

/* 포스트 목록 조회
 * GET /api/posts
 * */
export const list = async (ctx) => {
	const page = parseInt(ctx.query.page || '1', 10);
	if (page < 1) {
		ctx.status = 400;
		return;
	}

	const { tag, username } = ctx.query;
	const query = {
		...(username ? { 'user.username': username } : {}),
		...(tag ? { tags: { $regex: new RegExp(tag) } } : {}),
	};

	console.log(query);

	try {
		const posts = await Post.find(query)
			.sort({ _id: -1 })
			.limit(10)
			.skip((page - 1) * 10)
			.lean()
			.exec();
		const postCount = await Post.countDocuments().exec();
		ctx.set('Last-Page', Math.ceil(postCount / 10));
		ctx.body = posts.map((post) => ({
			...post,
			body:
				post.body.length < 200 ? post.body : `${post.body.slice(0, 200)}...`,
		}));
	} catch (e) {
		ctx.throw(500, e);
	}
};

/*특정 포스트 조회
 * GET /api/posts/:id
 * */
export const read = async (ctx) => {
	ctx.body = ctx.state.post;
};

/*특정 포스트 제거
 * DELETE /api/post/:id
 * */
export const remove = async (ctx) => {
	const { id } = ctx.params;
	try {
		await Post.findByIdAndRemove(id).exec();
		ctx.status = 204; // 성공하긴했으나 응답할 데이터 없음
	} catch (e) {
		ctx.throw(500, e);
	}
};

/*포스트 수정(특정 필드 변경)
 * PATCH /api/posts/:id
 * */
export const update = async (ctx) => {
	const schema = Joi.object().keys({
		//객체가 다음 필드를 가지고있는지 검증
		title: Joi.string(), //required() 필수체크
		body: Joi.string(),
		tags: Joi.array().items(Joi.string()),
	});

	const result = schema.validate(ctx.request.body);
	if (result.error) {
		ctx.status = 400;
		ctx.body = result.error;
		return;
	}

	const { id } = ctx.params;
	try {
		const post = await Post.findByIdAndUpdate(id, ctx.request.body, {
			new: true, //이 값을 설정시 변경된값을 false 설정시 업데이트 되기 전 값을 반환
		}).exec();
		if (!post) {
			ctx.status = 404;
			return;
		}
		ctx.body = post;
	} catch (e) {
		ctx.throw(500, e);
	}
};

export const checkOwnPost = (ctx, next) => {
	const { user, post } = ctx.state;
	if (post.user._id.toString() !== user.id) {
		ctx.status = 403;
		return;
	}
	return next();
};
