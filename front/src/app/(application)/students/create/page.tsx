"use client";

import { http } from "@/app/utils/xsrfToken";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import React, { useState } from "react";

interface Error {
  message: string;
}

const Page = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // 生徒のデータを新しく追加する関数
  const createStudent = async () => {
    // 登録するデータ
    const requestBody = {
      name: name,
    };
    // APIにリクエストを送信して、データを登録する
    http
      .post("/api/students", requestBody, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        // 登録が完了したら、生徒一覧ページに遷移する
        router.push("/students");
      })
      .catch((err: AxiosError<Error>) => {
        setErrorMessage(
          err.response?.data?.message ?? "エラーが発生しました。"
        );
      });
  };

  return (
    <div>
      <div className="py-2 px-4">
        <p>追加する生徒の名前を入力してください</p>
      </div>
      <input
        type="text"
        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 m-3 max-w-sm"
        placeholder="name"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <div className="py-1 px-4">
        <p className="text-red-500">{errorMessage}</p>
      </div>
      <div>
        <button
          className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded m-3"
          onClick={() => {
            createStudent();
          }}
        >
          送信
        </button>
      </div>
    </div>
  );
};

export default Page;
