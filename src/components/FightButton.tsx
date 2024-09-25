

const FightButton = ({
    buttonClick,
    label
  }) => {
    return (
      <button 
        style={{
          color: "red",
          fontSize: 24,
          padding: 50
        }}
        onClick={buttonClick}
      >
        {label}  
      </button>
    )
  }
  
  export default FightButton;