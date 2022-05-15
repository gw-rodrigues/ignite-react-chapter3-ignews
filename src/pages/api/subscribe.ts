import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../services/stripe";
import { getSession } from "next-auth/react";
import { strictEqual } from "assert";

export default async function Subscribe(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const session = await getSession({ req });
    const stripeCustomer = await stripe.customers.create({
      email: session.user.email,
      //metadata
    });
    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      customer: stripeCustomer.id, //dos cookies apos esta loggado
      payment_method_types: ["card"], //outros
      billing_address_collection: "required", //ou Auto config no stripe
      line_items: [
        {
          price: "price_secrety_key",
          quantity: 1,
        },
      ],
      mode: "subscription", //one-time
      allow_promotion_codes: true, //cupons
      success_url: process.env.STRIPE_SUCCESS_URL,
      cancel_url: process.env.STRIPE_CANCEL_URL,
    });
    return res.status(200).json({ sessionID: stripeCheckoutSession.id }); //com id vamos/pesquisamos depois user/converte url
  }else{
      res.setHeader('Allow','POST')
      res.status(405).end('Method not allowed')
  }
}
