export const default_src = 'data:image/jpeg;base64,'
export const base_url = 'http://localhost:3000'

  // categories data
  export const categoriesData = [
    //Women's and girls fashion categories
   {
    level:0,
    title:"Women's & Girl's Fashions",
    children:[
      {
      level:1,
      title: "Traditional wear",
      children:[{
        level:2,
        title:"Saree"
      },
    {
      level:2, 
      title:"Shalwaar Kameez"
    },
    {
      level:2, 
      title:"Party Kameez & Gowns"
    },
    {
      level:2, 
      title:"Kurtis"
    },
    {
      level:2,
      title:"Pants & Plazzos"
    },
    ]
    },
    {
      level:1,
      title:"Muslim Wears",
      children:[
        {
          level:2,
          title:"Hijab"
        },
        {
          level:2,
          title:"Long Dresses"
        }
      ]
    },
    {
      level:1,
      title:"Western Wears",
      children:[{
        level:2,
        title:"T-shirts"
      },
    {
      level:2, 
      title:"Tunics"
    },
    {
      level:2,
      title:"Tops"
    }
    ]
    },
    {
      level:1,
      title:"Shoes",
      children:[
        {
          level:2,
          title:"Heels"
        },
        {
          level:2,
          title:"Flats"
        },
        {
          level:2,
          title: "Sneakers"
        },
        {
          level:2,
          title:"Pump shoes"
        }
      ]
    },
    {
      level:1,
      title:"Bags",
      children:[
        {level:2, title:"Crossbody & Soulder bags"},
        {level:2, title:"Wallets"},
        {level:2, title:"Top handle bags"},
        {level:2, title:"Backpacks"},
      ]
    },
    {
      level:1,
      title:"Watches",
      children:[
        {level:2, title:"Casual"},
        {level:2, title:"Business"},
        {level:2, title:"Fashion"},
        {level:2, title:"Sports"},
        {level:2, title:"Accessories"},
      ]
    }
  ]
   },
   //Men's and Boys fashion categories
   {
    level:0,
    title: "Men's & Boys Fashion",
    children:[
      {level:1, title:"Clothings", children:[
        {level:2, title:"T-Shirts"},
        {level:2, title:"Jeans"},
        {level:2, title:"Casual Shirts"},
        {level:2, title:"Polo Shirts"},
        {level:2, title:"Kurtas & Panjabis"},
        {level:2, title:"Socks"},
        {level:2, title:"Joggers & Sweats"},
        {level:2, title:"Rain Coats & Trenches"},
      ]},
      {level:1, title:"Shoes", children:[
        {level:2, title:"Sneakers"},
        {level:2, title:"Flip Flops"},
        {level:2, title:"Formal Shoes"},
        {level:2, title:"Sandals"},
        {level:2, title:"Rain Boots"},
        {level:2, title:"Shoes Accessories"},
      ]},
      {level:1, title:"Muslim Wears", children:[
        {level:2, title:"Jubbahs"},
        {level:2, title:"Muslimin Shirts"},
        {level:2, title:"Accessories"},
      ]},
      {level:1, title:"Accessories", children:[
        {leve:2, title:"Belts"},
        {leve:2, title:"Bow Ties"},
        {leve:2, title:"Hats & Caps"},
        {leve:2, title:"Ties"},
        {leve:2, title:"Umbrellas"},
      ]},
      {level:1, title:"Bags", children:[
        {level:2, title:"Backpacks"},
        {level:2, title:"Business Bags"},
        {level:2, title:"Crossbody Bags"},
        {level:2, title:"Tote Bags"},
        {level:2, title:"Wallets & Accessories"},
      ]},
      {level:1, title:"Watches", children:[
        {level:2, title:"Accessories"},
        {level:2, title:"Business"},
        {level:2, title:"Casual"},
        {level:2, title:"Fashion"},
        {level:2, title:"Sports"},
      ]},
      {level:1, title:"Eyewear", children:[
        {level:2, title:"Eyeglasses"},
        {level:2, title:"Sunglasses"},
      ]},
    ]
   },
   // Electronic Devies
   {
    level:0,
    title:"Electronics Device",
    children:[
      {level:1, title:"Smartphones",children:[
        {level:2, title:"Xiaomi Phones"},
        {level:2, title:"Realme Phones"},
        {level:2, title:"Infinix Phones"},
        {level:2, title:"Samsung Phones"},
        {level:2, title:"OPPO Phones"},
        {level:2, title:"Vivo Phones"},
        {level:2, title:"Apple Phones"},
        {level:2, title:"Motorola Phones"},
        {level:2, title:"Symphony Phones"},
        {level:2, title:"Tecno Phones"},
        {level:2, title:"Walton Phones"},
      ]},
      {level:1, title:"Feature Phone",children:[
        {level:2, title:"Nokia Feature Phones"},
        {level:2, title:"Symphony Feature Phones"},
        {level:2, title:"Walton Feature Phones"},
        {level:2, title:"Benco Feature Phones"},
        {level:2, title:"Bengal Feature Phones"},
        {level:2, title:"Linnex Feature Phones"},
        {level:2, title:"Tinmo Feature Phones"},
        {level:2, title:"Gphone Feature Phones"},
      ]},
      {level:1, title:"Tablets",children:[
        {level:2, title:"Apple"},
        {level:2, title:"Samsung"},
        {level:2, title:"Walton"},
        {level:2, title:"Lenovo"},
        {level:2, title:"Honor"},
        {level:2, title:"Amazon Fire"},
      ]},
      {level:1, title:"Cameras",children:[
        {level:2, title:"Canon"},
        {level:2, title:"Nikon"},
        {level:2, title:"Sony"},
        {level:2, title:"Zhiyun"},
        {level:2, title:"GoPro"},
        {level:2, title:"Insta 360"},
        {level:2, title:"DSLR"},
        {level:2, title:"Mirrorless"},
        {level:2, title:"Video & Action Camcorder"},
        {level:2, title:"Security Cameras & Systems"},
        {level:2, title:"Drone"},
      ]},
      {level:1, title:"Projectors",children:[
        {level:2, title:"Projector Screens"},
      ]},
      {level:1, title:"Mobile Accessories",children:[
        {level:2, title:"Phone Cases"},
        {level:2, title:"Phone Screen Protector"},
        {level:2, title:"Cable & Converters"},
        {level:2, title:"Docks & Stands"},
        {level:2, title:"Wall Chargers"},
        {level:2, title:"Power Banks"},
      ]},
      {level:1, title:"Gaming Consoles",children:[
        {level:2, title:"PlayStation Console"},
        {level:2, title:"PlayStation Games"},
        {level:2, title:"PlayStation Controller"},
        {level:2, title:"Nintendo Games"},
        {level:2, title:"Nintendo Consoles"},
        {level:2, title:"Xbox Games"},
        {level:2, title:"Xbox Consoles"},
      ]},
      {level:1, title:"Audio",children:[
        {level:2, title:"Headphones & Headsets"},
        {level:2, title:"Bluetooth Speaker"},
      ]},
      {level:1, title:"Wearable",children:[
        {level:2, title:"Smartwatches"},
      ]},
      {level:1, title:"Laptops",children:[
        {level:2, title:"Apple"},
        {level:2, title:"ASUS"},
        {level:2, title:"Acer"},
        {level:2, title:"Dell"},
        {level:2, title:"HP"},
        {level:2, title:"Lenovo"},
        {level:2, title:"Microsoft"},
        {level:2, title:"MSI"},
        {level:2, title:"Realme"},
        {level:2, title:"Walton"},
      ]},
      {level:1, title:"Desktops",children:[
        {level:2, title:"All-In-One"}
      ]},
    ]
   }
  ];
  //Admin Menus
  export const adminMenus = [
    {title:"Dashboard", src:"fa-regular fa-clipboard"},
    {title:"Inbox", src:"fa-regular fa-clipboard"},
    {title:"Accounts", src:"fa-regular fa-clipboard", gap:true},
    {title:"Schedule", src:"fa-regular fa-clipboard",},
    {title:"Search", src:"fa-regular fa-clipboard",},
    {title:"Category", src:"fa-regular fa-clipboard",},
    {title:"Analytics", src:"fa-regular fa-clipboard",},
    {title:"Files", src:"fa-regular fa-clipboard", gap:true},
    {title:"Setting", src:"fa-regular fa-clipboard",},
  ]
// product Data
export const productData = [
    {
      id: 1,
      category:"Computers and Laptops",
      name: "MacBook pro M2 chipset 256gb ssd 8gb ram space-gray color with apple 1 year warranty",
      description:
        "Product details are a crucial part of any eCommerce website or online marketplace. These details help the potential customers to make an informed decision about the product they are interested in buying. A well-written product description can also be a powerful marketing tool that can help to increase sales.Product details typically include information about the product's features, specifications, dimensions, weight, materials, and other relevant information that can help customers to understand the product better. The product details section should also include high-quality images and videos of the product, as well as customer reviews and ratings.",
      image_Url: [
        {
          public_id: "test",
          url: "https://www.istorebangladesh.com/images/thumbs/0000286_macbook-pro-m1_550.png",
        },
        {
          public_id: "test",
          url: "https://www.istorebangladesh.com/images/thumbs/0000286_macbook-pro-m1_550.png",
        },
      ],
      shop: {
        name: "Apple inc.",
        shop_avatar: {
          public_id: "test",
          url: "https://www.hatchwise.com/wp-content/uploads/2022/05/amazon-logo-1024x683.png",
        },
        ratings: 4.2,
      },
      price: 1099,
      discount_price: 1049,
      rating: 4,
      total_sell: 35,
      stock: 10,
    },
    {
      id: 2,
      category:"Mobile and Tablets",
      name: "Iphone 14 pro max 256 gb ssd and 8 gb ram silver colour",
      description:
        "Product details are a crucial part of any eCommerce website or online marketplace. These details help the potential customers to make an informed decision about the product they are interested in buying. A well-written product description can also be a powerful marketing tool that can help to increase sales.Product details typically include information about the product's features, specifications, dimensions, weight, materials, and other relevant information that can help customers to understand the product better. The product details section should also include high-quality images and videos of the product, as well as customer reviews and ratings.",
      image_Url: [
        {
          public_id: "test",
          url: "https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg",
        },
        {
          public_id: "test",
          url: "https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg",
        },
      ],
      shop: {
        name: "Amazon Ltd",
        shop_avatar: {
          public_id: "test",
          url: "https://www.hatchwise.com/wp-content/uploads/2022/05/amazon-logo-1024x683.png",
        },
        ratings: 4.2,
      },
      discount_price: 1099,
      rating: 5,
      total_sell: 80,
      stock: 10,
    },
    {
      id: 1,
      category:"Computers and Laptop",
      name: "MacBook pro M2 chipset 256gb ssd 8gb ram space gray color with apple 1 year warranty",
      description:
        "Product details are a crucial part of any eCommerce website or online marketplace. These details help the potential customers to make an informed decision about the product they are interested in buying. A well-written product description can also be a powerful marketing tool that can help to increase sales.Product details typically include information about the product's features, specifications, dimensions, weight, materials, and other relevant information that can help customers to understand the product better. The product details section should also include high-quality images and videos of the product, as well as customer reviews and ratings.",
      image_Url: [
        {
          public_id: "test",
          url: "https://www.istorebangladesh.com/images/thumbs/0000286_macbook-pro-m1_550.png",
        },
        {
          public_id: "test",
          url: "https://www.istorebangladesh.com/images/thumbs/0000286_macbook-pro-m1_550.png",
        },
      ],
      shop: {
        name: "Apple inc.",
        shop_avatar: {
          public_id: "test",
          url: "https://www.hatchwise.com/wp-content/uploads/2022/05/amazon-logo-1024x683.png",
        },
        ratings: 4.2,
      },
      price: 1099,
      discount_price: 1049,
      rating: 4,
      total_sell: 75,
      stock: 10,
    },
    {
      id: 4,
      category:"Others",
      name: "New Fashionable Watch for men 2023 with multiple colors",
      description:
        "Product details are a crucial part of any eCommerce website or online marketplace. These details help the potential customers to make an informed decision about the product they are interested in buying. A well-written product description can also be a powerful marketing tool that can help to increase sales.Product details typically include information about the product's features, specifications, dimensions, weight, materials, and other relevant information that can help customers to understand the product better. The product details section should also include high-quality images and videos of the product, as well as customer reviews and ratings.",
      image_Url: [
        {
          public_id: "test",
          url: "https://i0.wp.com/eccocibd.com/wp-content/uploads/2022/01/1802NL02_1.png?fit=550%2C550&ssl=1",
        },
        {
          public_id: "test",
          url: "https://i0.wp.com/eccocibd.com/wp-content/uploads/2022/01/1802NL02_1.png?fit=550%2C550&ssl=1",
        },
      ],
      shop: {
        name: "Shahriar Watch House",
        shop_avatar: {
          public_id: "test",
          url: "https://www.hatchwise.com/wp-content/uploads/2022/05/amazon-logo-1024x683.png",
        },
        ratings: 4.2,
      category:"Others"
      },
      price: 100,
      discount_price: 79,
      rating: 4,
      total_sell: 12,
      stock: 10,
    },
    {
      id: 5,
      category:"Shoes",
      name: "New Trend shoes for gents with all sizes",
      description:
        "Product details are a crucial part of any eCommerce website or online marketplace. These details help the potential customers to make an informed decision about the product they are interested in buying. A well-written product description can also be a powerful marketing tool that can help to increase sales.Product details typically include information about the product's features, specifications, dimensions, weight, materials, and other relevant information that can help customers to understand the product better. The product details section should also include high-quality images and videos of the product, as well as customer reviews and ratings.",
      image_Url: [
        {
          public_id: "test",
          url: "https://mirzacdns3.s3.ap-south-1.amazonaws.com/cache/catalog/RLV0015/2-800x800.jpg",
        },
        {
          public_id: "test",
          url: "https://mirzacdns3.s3.ap-south-1.amazonaws.com/cache/catalog/RLV0015/2-800x800.jpg",
        },
      ],
      shop: {
        name: "Alisha Shoes Mart",
        shop_avatar: {
          public_id: "test",
          url: "https://www.hatchwise.com/wp-content/uploads/2022/05/amazon-logo-1024x683.png",
        },
        ratings: 4.2,
      },
      price: 120,
      discount_price: 89,
      rating: 5,
      total_sell: 49,
      stock: 10,
    },
    {
      id: 1,
      name: "Gaming Headphone Asus with mutiple color and free delivery",
      description:
        "Product details are a crucial part of any eCommerce website or online marketplace. These details help the potential customers to make an informed decision about the product they are interested in buying. A well-written product description can also be a powerful marketing tool that can help to increase sales.Product details typically include information about the product's features, specifications, dimensions, weight, materials, and other relevant information that can help customers to understand the product better. The product details section should also include high-quality images and videos of the product, as well as customer reviews and ratings.",
      image_Url: [
        {
          public_id: "test",
          url: "https://www.startech.com.bd/image/cache/catalog/headphone/havit/h763d/h763d-02-500x500.jpg",
        },
        {
          public_id: "test",
          url: "https://eratablet.com/wp-content/uploads/2022/08/H51ba6537405f4948972e293927673546u.jpg",
        },
      ],
      shop: {
        name: "Asus Ltd",
        shop_avatar: {
          public_id: "test",
          url: "https://www.hatchwise.com/wp-content/uploads/2022/05/amazon-logo-1024x683.png",
        },
        ratings: 4.2,
      },
      price: 300,
      discount_price: 239,
      rating: 4.5,
      reviews: [
        {
          user: {
            // user object will be here
          },
          comment: "IT's so cool!",
          rating: 5,
        },
      ],
      total_sell: 20,
      stock: 10,
      category:"Music and Gaming"
    },
    {
      id: 4,
      name: "New Fashionable Watch for men 2023 with multiple colors",
      description:
        "Product details are a crucial part of any eCommerce website or online marketplace. These details help the potential customers to make an informed decision about the product they are interested in buying. A well-written product description can also be a powerful marketing tool that can help to increase sales.Product details typically include information about the product's features, specifications, dimensions, weight, materials, and other relevant information that can help customers to understand the product better. The product details section should also include high-quality images and videos of the product, as well as customer reviews and ratings.",
      image_Url: [
        {
          public_id: "test",
          url: "https://i0.wp.com/eccocibd.com/wp-content/uploads/2022/01/1802NL02_1.png?fit=550%2C550&ssl=1",
        },
        {
          public_id: "test",
          url: "https://i0.wp.com/eccocibd.com/wp-content/uploads/2022/01/1802NL02_1.png?fit=550%2C550&ssl=1",
        },
      ],
      shop: {
        name: "Shahriar Watch House",
        shop_avatar: {
          public_id: "test",
          url: "https://www.hatchwise.com/wp-content/uploads/2022/05/amazon-logo-1024x683.png",
        },
        ratings: 4.2,
      },
      price: 100,
      discount_price: 79,
      rating: 4,
      total_sell: 62,
      stock: 10,
    },
    {
      id: 1,
      name: "Gaming Headphone Asus with mutiple color and free delivery",
      description:
        "Product details are a crucial part of any eCommerce website or online marketplace. These details help the potential customers to make an informed decision about the product they are interested in buying. A well-written product description can also be a powerful marketing tool that can help to increase sales.Product details typically include information about the product's features, specifications, dimensions, weight, materials, and other relevant information that can help customers to understand the product better. The product details section should also include high-quality images and videos of the product, as well as customer reviews and ratings.",
      image_Url: [
        {
          public_id: "test",
          url: "https://www.startech.com.bd/image/cache/catalog/headphone/havit/h763d/h763d-02-500x500.jpg",
        },
        {
          public_id: "test",
          url: "https://eratablet.com/wp-content/uploads/2022/08/H51ba6537405f4948972e293927673546u.jpg",
        },
      ],
      shop: {
        name: "Asus Ltd",
        shop_avatar: {
          public_id: "test",
          url: "https://www.hatchwise.com/wp-content/uploads/2022/05/amazon-logo-1024x683.png",
        },
        ratings: 4.2,
      },
      price: 300,
      discount_price: 239,
      rating: 4.5,
      reviews: [
        {
          user: {
            // user object will be here
          },
          comment: "IT's so cool!",
          rating: 5,
        },
      ],
      total_sell: 20,
      stock: 10,
    },
    {
      id: 2,
      category:"Mobile and Tablets",
      name: "Iphone 14 pro max 256 gb ssd and 8 gb ram silver colour",
      description:
        "Product details are a crucial part of any eCommerce website or online marketplace. These details help the potential customers to make an informed decision about the product they are interested in buying. A well-written product description can also be a powerful marketing tool that can help to increase sales.Product details typically include information about the product's features, specifications, dimensions, weight, materials, and other relevant information that can help customers to understand the product better. The product details section should also include high-quality images and videos of the product, as well as customer reviews and ratings.",
      image_Url: [
        {
          public_id: "test",
          url: "https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg",
        },
        {
          public_id: "test",
          url: "https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg",
        },
      ],
      shop: {
        name: "Amazon Ltd",
        shop_avatar: {
          public_id: "test",
          url: "https://www.hatchwise.com/wp-content/uploads/2022/05/amazon-logo-1024x683.png",
        },
        ratings: 4.2,
      },
      discount_price: 1099,
      rating: 5,
      total_sell: 20,
      stock: 10,
    },
    {
      id: 1,
      category:"Music and Gaming",
      name: "Gaming Headphone Asus with mutiple color and free delivery",
      description:
        "Product details are a crucial part of any eCommerce website or online marketplace. These details help the potential customers to make an informed decision about the product they are interested in buying. A well-written product description can also be a powerful marketing tool that can help to increase sales.Product details typically include information about the product's features, specifications, dimensions, weight, materials, and other relevant information that can help customers to understand the product better. The product details section should also include high-quality images and videos of the product, as well as customer reviews and ratings.",
      image_Url: [
        {
          public_id: "test",
          url: "https://www.startech.com.bd/image/cache/catalog/headphone/havit/h763d/h763d-02-500x500.jpg",
        },
        {
          public_id: "test",
          url: "https://eratablet.com/wp-content/uploads/2022/08/H51ba6537405f4948972e293927673546u.jpg",
        },
      ],
      shop: {
        name: "Asus Ltd",
        shop_avatar: {
          public_id: "test",
          url: "https://www.hatchwise.com/wp-content/uploads/2022/05/amazon-logo-1024x683.png",
        },
        ratings: 4.2,
      },
      price: 300,
      discount_price: 239,
      rating: 4.5,
      reviews: [
        {
          user: {
            // user object will be here
          },
          comment: "IT's so cool!",
          rating: 5,
        },
      ],
      total_sell: 20,
      stock: 10,
    },
  ];