const getList = async (url, skip, take): Promise<any> =>
    new Promise((resolve) => {
        setTimeout(() => {
            let data = [];
            for (let i = skip; i <= skip + take; i++) {
                data.push({ id: i, title: `test ${i}`, type: 1 })
            }
            resolve({items: data, total: 500});
        }, 1000);
    });

export default getList;