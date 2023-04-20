import Transactions from "../models/TransactionModel.js";
import Admins from "../models/AdminModel.js";
import con from "../config/SqlQuery.js";

export const transaction = async (req, res) => {
  try {
    const now = new Date(Date.now());
    now.setHours(now.getHours() + 5); // add 5 hours to the current time
    now.setMinutes(now.getMinutes() + 30); // add 30 minutes to the current time
    const currentDateTime = now.toISOString();


    const user_id = req.body.user_id;
    const _by = req.body._by;
    const des = req.body.des;
    const key = parseInt(req.body.key);
    const type = req.body.type;

    const User = await Admins.findOne({
      where: {
        id: user_id,
      },
    });
    if (type === "Credit") {
      if (parseInt(User.available_key) < key) {
        res.status(401).send({
          status: false,
          msg: "Cannot credit keys greater than available keys",
          user: User,
        });
      } else {
        transactionCredit();
      }
    } else if (type === "Debit") {
      if (User.available_key < key) {
        res.status(401).send({
          status: false,
          msg: "Cannot debit keys greater than available keys",
          user: User.available_key,
        });
      } else {
        transactionDebit();
      }
    }
    async function transactionCredit() {
      const user_find = await Admins.findOne({
        where: {
          id: user_id,
        },
      });

      const byUser = await Admins.findOne({
        where: {
          id: _by,
        },
      });
      const transaction = await Transactions.create({
        user_id: user_id,
        _by: _by,
        des: des,
        key: key,
        balance: user_find.available_key,
        current_bal: parseInt(user_find.available_key) + parseInt(key),
        type: type,
        datetime: currentDateTime
      });

      const user_update = await user_find.update({
        available_key: parseInt(user_find.available_key) - parseInt(key),
        used_key: parseInt(User.used_key) + parseInt(key),
      });

      const by_update = await byUser.update({
        available_key: parseInt(byUser.available_key) + parseInt(key),
      });

      if (transaction) {
        res.status(200).send({
          status: true,
          msg: "Transaction created successfully",
          data: {
            transaction: transaction,
            by_user: by_update,
            user_to: user_update,
          },
        });
      }

      if (type === "Debit") {
        const by_update = await User.update({
          available_key: transaction.current_bal,
          used_key:
            parseInt(User.used_key) +
            parseInt(User.available_key) -
            parseInt(transaction.current_bal),
        });

        const user_find = await Admins.findOne({
          where: {
            id: user_id,
          },
        });

        const user_update = await user_find.update({
          available_key: parseInt(user_find.available_key) + parseInt(key),
        });
      }
    }

    async function transactionDebit() {
      const user_find = await Admins.findOne({
        where: {
          id: user_id,
        },
      });

      const byUser = await Admins.findOne({
        where: {
          id: _by,
        },
      });

      const transaction = await Transactions.create({
        user_id: user_id,
        _by: _by,
        des: des,
        key: key,
        balance: byUser.available_key,
        current_bal: parseInt(byUser.available_key) - parseInt(key),
        type: type,
        datetime: currentDateTime
      });

      const user_update = await byUser.update({
        available_key: parseInt(byUser.available_key) - parseInt(key),
        used_key: parseInt(byUser.used_key) + parseInt(key),
      });

      const by_update = await user_find.update({
        available_key: parseInt(user_find.available_key) + parseInt(key),
      });

      if (transaction) {
        res.status(200).send({
          status: true,
          msg: "Transaction created successfully",
          data: {
            transaction: transaction,
            by_user: by_update,
            user_to: user_update,
          },
        });
      }
    }
  } catch (err) {
    res.status(500).send({ status: false, msg: "something wrong " });
  }
};

// export const transaction = async (req, res) => {
//   try {
//     const user_id = req.body.user_id;
//     const _by = req.body._by;
//     const des = req.body.des;
//     const key = parseInt(req.body.key);
//     const type = req.body.type;

//     const User = await Admins.findOne({
//       where: {
//         id: user_id,
//       },
//     });

//     const ByUser = await Admins.findOne({
//       where: {
//         id: _by,
//       },
//     });

//     if (type === "Credit") {
//     const transaction = await Transactions.create({
//         user_id:user_id,
//         _by: _by,
//         des: des,
//         key: key,
//         balance: User.available_key,
//         current_bal: parseInt(User.available_key) + parseInt(key),
//         type: type,
//       });

//       if(transaction){
//          await ByUser.update({
//           available_key: parseInt(transaction.current_bal)
//         });

//         await  User.updated({
//           available_key: parseInt(transaction.available_key) - parseInt(key),
//           used_key: parseInt(User.user_key) + parseInt(key)
//         })

//       }
//      return request.send("credit")
//     }
//   } catch (err) {
//     res.status(500).send({ status: false, msg: "something wrong " });
//   }
// };

export const used_keysLicence = async (req, res) => {
  try {
    const { toDate, forDate, user_id } = req.body;

    const User = await Admins.findOne({
      where: {
        id: user_id,
      },
    });

    const UserPerent = await Admins.findOne({
      where: {
        id: User.perent_id,
        // created_at: {
        //   [Op.between]: [forDate, toDate]
        // }
      },
    });

    const UserGrandPerent = await Admins.findOne({
      where: {
        id: UserPerent.perent_id,
      },
    });

    const UserGreatGrandPerent = await Admins.findOne({
      where: {
        id: UserGrandPerent.perent_id,
      },
    });

    return res.status(200).send({
      status: true,
      msg: "used_keysLicence",
      data: {
        ...User.dataValues,
        parent: UserPerent.name,
        UserGrandPerent: UserGrandPerent.name,
        UserGreatGrandPerent: UserGreatGrandPerent.name,
      },
    });
  } catch (err) {
    return res.status(400).send(err);
  }
};

export const TransactionHistory = async (req, res) => {
  const url = req.url;
  const query = req.query;

  const user_id = query.id;

    
    if(!query) return res.send({ status: false, message: "All fields are required", err: err });

  try {
    if (user_id) {
      con.connect(function (err) {
        if (err) throw err;
        con.query(
          ` SELECT 
            transction.des,
            transction._by,
            transction.user_id,
            transction.key,
            transction.balance,
            transction.type,
            transction.id as id,
            transction.datetime,
            
            
            adminby.name as by_name,
            adminby.business_name as by_business_name,
            adminby.email as by_email,
            
            userid.name as user_name,
            userid.business_name,
            userid.email
            
            FROM transction as transction
            INNER JOIN admins as adminby ON transction._by =  adminby.id 
            INNER JOIN admins as userid ON transction.user_id =  userid.id 
            
            WHERE  user_id=${user_id} AND cast(transction.datetime as date) BETWEEN  "${query.to}" AND  "${query.from}" ORDER BY transction.datetime          
        `,
          function (err, result) {
            if (err) throw err;

            return res.status(200).send({
              status: true,
              message: "successfully fetch",
              data: result,
            });
          }
        );
      });

    } else {
      Transactions.findAll().then((response) => {
        return res.status(200).send({
          status: true,
          message: "successfully fetch",
          data: response,
        });
      });
    }
  } catch (err) {
    res.send({ status: false, message: "something went wrong", err: err });
  }
};
