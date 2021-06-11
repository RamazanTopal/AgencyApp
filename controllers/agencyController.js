const Portfolio=require('../models/Portfolio');
const fs=require('fs');
exports.getIndex=async (req,res)=>{
    const portfolio=await Portfolio.find();

    res.render('index',{
        portfolio:portfolio
    }
    )
}

exports.getPortfolio=(req,res)=>{
    res.render('portfolioAdd')
}

exports.postPortfolio=async (req,res)=>{
    let uploadeImage = req.files.image;
    let uploadPath = __dirname + '/../public/uploads/' + uploadeImage.name;
    uploadeImage.mv(uploadPath, async () => {
    
     await Portfolio.create({
        name:req.body.name,
        description:req.body.description,
        image:uploadeImage.name//fotograf cekerken src basina uploads/image seklinde olucak
    });
    res.redirect("/")
    });

}
exports.getUpdatePortfolio=async (req,res)=>{
    const portfolio=await Portfolio.findOne({_id:req.params.id});
    res.render('portfolioUpdate',{
        portfolio:portfolio
    })
}

exports.updatePortfolio = async (req, res) => {
    const portfolio = await Portfolio.findOne({ _id: req.params.id });
    portfolio.name = req.body.name;
    portfolio.description = req.body.description;
    portfolio.save();
  
    res.redirect(`/`);
  };

exports.deletePortfolio = async (req, res) => {
    const portfolio = await Portfolio.findOne({ _id: req.params.id });
    let deletedImage = __dirname + '/../public/uploads/' + portfolio.image;
    fs.unlinkSync(deletedImage);
    await Portfolio.findByIdAndRemove(req.params.id);
    res.redirect('/');
  };