CREATE TABLE "posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"content" text NOT NULL,
	"author_id" serial NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
